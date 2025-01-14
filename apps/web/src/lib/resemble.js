/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable no-prototype-builtins */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable init-declarations */
/* eslint-disable func-style */
/*
James Cryer / Huddle
URL: https://github.com/rsmbl/Resemble.js
*/

var naiveFallback = function () {
  // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
  if (typeof self === 'object' && self) {
    return self;
  }
  if (typeof window === 'object' && window) {
    return window;
  }
  throw new Error('Unable to resolve global `this`');
};

var getGlobalThis = function () {
  // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
  // Fallback to standard globalThis if available
  if (typeof globalThis === 'object' && globalThis) {
    return globalThis;
  }

  try {
    Object.defineProperty(Object.prototype, '__global__', {
      configurable: true,
      get() {
        return this;
      },
    });
  } catch (error) {
    return naiveFallback();
  }
  try {
    // eslint-disable-next-line no-undef
    if (!__global__) {
      return naiveFallback();
    }

    return __global__; // eslint-disable-line no-undef
  } finally {
    delete Object.prototype.__global__;
  }
};

var isNode = function () {
  const globalPolyfill = getGlobalThis();

  return (
    typeof globalPolyfill.process !== 'undefined' &&
    globalPolyfill.process.versions &&
    globalPolyfill.process.versions.node
  );
};

var Img;
var Canvas;
var loadNodeCanvasImage;

if (isNode()) {
  // 'Commenting this code as we are only running on browser'
  // Canvas = require('canvas'); // eslint-disable-line global-require
  // Img = Canvas.Image;
  // loadNodeCanvasImage = Canvas.loadImage;
} else {
  Img = Image;
}

function createCanvas(width, height) {
  if (isNode()) {
    return Canvas.createCanvas(width, height);
  }

  var cnvs = document.createElement('canvas');

  cnvs.width = width;
  cnvs.height = height;

  return cnvs;
}

var oldGlobalSettings = {};
var globalOutputSettings = oldGlobalSettings;

var resemble = function (fileData) {
  var pixelTransparency = 1;

  var errorPixelColor = {
    alpha: 255,

    blue: 255,

    green: 0,
    // Color for Error Pixels. Between 0 and 255.
    red: 255,
  };

  var targetPix = { a: 0, b: 0, g: 0, r: 0 }; // IsAntialiased

  var errorPixelTransform = {
    diffOnly(px, offset, d1, d2) {
      px[offset] = d2.r;
      px[offset + 1] = d2.g;
      px[offset + 2] = d2.b;
      px[offset + 3] = d2.a;
    },
    flat(px, offset) {
      px[offset] = errorPixelColor.red;
      px[offset + 1] = errorPixelColor.green;
      px[offset + 2] = errorPixelColor.blue;
      px[offset + 3] = errorPixelColor.alpha;
    },
    flatDifferenceIntensity(px, offset, d1, d2) {
      px[offset] = errorPixelColor.red;
      px[offset + 1] = errorPixelColor.green;
      px[offset + 2] = errorPixelColor.blue;
      px[offset + 3] = colorsDistance(d1, d2);
    },
    movement(px, offset, d1, d2) {
      px[offset] =
        (d2.r * (errorPixelColor.red / 255) + errorPixelColor.red) / 2;
      px[offset + 1] =
        (d2.g * (errorPixelColor.green / 255) + errorPixelColor.green) / 2;
      px[offset + 2] =
        (d2.b * (errorPixelColor.blue / 255) + errorPixelColor.blue) / 2;
      px[offset + 3] = d2.a;
    },
    movementDifferenceIntensity(px, offset, d1, d2) {
      var ratio = (colorsDistance(d1, d2) / 255) * 0.8;

      px[offset] =
        (1 - ratio) * (d2.r * (errorPixelColor.red / 255)) +
        ratio * errorPixelColor.red;
      px[offset + 1] =
        (1 - ratio) * (d2.g * (errorPixelColor.green / 255)) +
        ratio * errorPixelColor.green;
      px[offset + 2] =
        (1 - ratio) * (d2.b * (errorPixelColor.blue / 255)) +
        ratio * errorPixelColor.blue;
      px[offset + 3] = d2.a;
    },
  };

  var errorPixel = errorPixelTransform.flat;
  var errorType;
  var boundingBoxes;
  var ignoredBoxes;
  var ignoreAreasColoredWith;
  var largeImageThreshold = 1200;
  var useCrossOrigin = true;
  var data = {};
  var images = [];
  var updateCallbackArray = [];

  var tolerance = {
    alpha: 16,

    blue: 16,

    green: 16,

    maxBrightness: 240,

    minBrightness: 16,
    // Between 0 and 255
    red: 16,
  };

  var ignoreAntialiasing = false;
  var ignoreColors = false;
  var scaleToSameSize = false;
  var compareOnly = false;
  var returnEarlyThreshold;

  function colorsDistance(c1, c2) {
    return (
      (Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b)) /
      3
    );
  }

  function withinBoundingBox(x, y, width, height, box) {
    return (
      x > (box.left || 0) &&
      x < (box.right || width) &&
      y > (box.top || 0) &&
      y < (box.bottom || height)
    );
  }

  function withinComparedArea(x, y, width, height, pixel2) {
    var isIncluded = true;
    var i;
    var boundingBox;
    var ignoredBox;
    var selected;
    var ignored;

    if (boundingBoxes instanceof Array) {
      selected = false;
      for (i = 0; i < boundingBoxes.length; i++) {
        boundingBox = boundingBoxes[i];
        if (withinBoundingBox(x, y, width, height, boundingBox)) {
          selected = true;
          break;
        }
      }
    }
    if (ignoredBoxes instanceof Array) {
      ignored = true;
      for (i = 0; i < ignoredBoxes.length; i++) {
        ignoredBox = ignoredBoxes[i];
        if (withinBoundingBox(x, y, width, height, ignoredBox)) {
          ignored = false;
          break;
        }
      }
    }

    if (ignoreAreasColoredWith) {
      return colorsDistance(pixel2, ignoreAreasColoredWith) !== 0;
    }

    if (selected === undefined && ignored === undefined) {
      return true;
    }
    if (selected === false && ignored === true) {
      return false;
    }
    if (selected === true || ignored === true) {
      isIncluded = true;
    }
    if (selected === false || ignored === false) {
      isIncluded = false;
    }

    return isIncluded;
  }

  function triggerDataUpdate() {
    var len = updateCallbackArray.length;
    var i;

    for (i = 0; i < len; i++) {
      if (typeof updateCallbackArray[i] === 'function') {
        updateCallbackArray[i](data);
      }
    }
  }

  function loop(w, h, callback) {
    var x;
    var y;

    for (x = 0; x < w; x++) {
      for (y = 0; y < h; y++) {
        callback(x, y);
      }
    }
  }

  function parseImage(sourceImageData, width, height) {
    var pixelCount = 0;
    var redTotal = 0;
    var greenTotal = 0;
    var blueTotal = 0;
    var alphaTotal = 0;
    var brightnessTotal = 0;
    var whiteTotal = 0;
    var blackTotal = 0;

    loop(width, height, (horizontalPos, verticalPos) => {
      var offset = (verticalPos * width + horizontalPos) * 4;
      var red = sourceImageData[offset];
      var green = sourceImageData[offset + 1];
      var blue = sourceImageData[offset + 2];
      var alpha = sourceImageData[offset + 3];
      var brightness = getBrightness(red, green, blue);

      if (red === green && red === blue && alpha) {
        if (red === 0) {
          blackTotal++;
        } else if (red === 255) {
          whiteTotal++;
        }
      }

      pixelCount++;

      redTotal += (red / 255) * 100;
      greenTotal += (green / 255) * 100;
      blueTotal += (blue / 255) * 100;
      alphaTotal += ((255 - alpha) / 255) * 100;
      brightnessTotal += (brightness / 255) * 100;
    });

    data.red = Math.floor(redTotal / pixelCount);
    data.green = Math.floor(greenTotal / pixelCount);
    data.blue = Math.floor(blueTotal / pixelCount);
    data.alpha = Math.floor(alphaTotal / pixelCount);
    data.brightness = Math.floor(brightnessTotal / pixelCount);
    data.white = Math.floor((whiteTotal / pixelCount) * 100);
    data.black = Math.floor((blackTotal / pixelCount) * 100);

    triggerDataUpdate();
  }

  function onLoadImage(hiddenImage, callback) {
    // Don't assign to hiddenImage, see https://github.com/Huddle/Resemble.js/pull/87/commits/300d43352a2845aad289b254bfbdc7cd6a37e2d7
    var { width } = hiddenImage;
    var { height } = hiddenImage;

    if (scaleToSameSize && images.length === 1) {
      width = images[0].width;
      height = images[0].height;
    }

    var hiddenCanvas = createCanvas(width, height);
    var imageData;

    hiddenCanvas.getContext('2d').drawImage(hiddenImage, 0, 0, width, height);
    imageData = hiddenCanvas.getContext('2d').getImageData(0, 0, width, height);

    images.push(imageData);

    callback(imageData, width, height);
  }

  function loadImageData(fileDataForImage, callback) {
    var fileReader;
    var hiddenImage = new Img();

    if (!hiddenImage.setAttribute) {
      hiddenImage.setAttribute = function setAttribute() {};
    }

    if (useCrossOrigin) {
      hiddenImage.setAttribute('crossorigin', 'anonymous');
    }

    hiddenImage.onerror = function (event) {
      hiddenImage.onload = null;
      hiddenImage.onerror = null; // Fixes pollution between calls

      const error = event ? event + '' : 'Unknown error';

      images.push({
        error: `Failed to load image '${fileDataForImage}'. ${error}`,
      });
      callback();
    };

    hiddenImage.onload = function () {
      hiddenImage.onload = null; // Fixes pollution between calls
      hiddenImage.onerror = null;
      onLoadImage(hiddenImage, callback);
    };

    if (typeof fileDataForImage === 'string') {
      hiddenImage.src = fileDataForImage;
      if (!isNode() && hiddenImage.complete && hiddenImage.naturalWidth > 0) {
        hiddenImage.onload();
      }
    } else if (
      typeof fileDataForImage.data !== 'undefined' &&
      typeof fileDataForImage.width === 'number' &&
      typeof fileDataForImage.height === 'number'
    ) {
      images.push(fileDataForImage);

      callback(
        fileDataForImage,
        fileDataForImage.width,
        fileDataForImage.height,
      );
    } else if (
      typeof Buffer !== 'undefined' &&
      fileDataForImage instanceof Buffer
    ) {
      // If we have Buffer, assume we're on Node+Canvas and its supported
      // hiddenImage.src = fileDataForImage;

      loadNodeCanvasImage(fileDataForImage)
        .then((image) => {
          hiddenImage.onload = null; // Fixes pollution between calls
          hiddenImage.onerror = null;
          onLoadImage(image, callback);
        })
        .catch((err) => {
          images.push({
            error: err ? err + '' : 'Image load error.',
          });
          callback();
        });
    } else {
      fileReader = new FileReader();
      fileReader.onload = function (event) {
        hiddenImage.src = event.target.result;
      };
      fileReader.readAsDataURL(fileDataForImage);
    }
  }

  function isColorSimilar(a, b, color) {
    var absDiff = Math.abs(a - b);

    if (typeof a === 'undefined') {
      return false;
    }
    if (typeof b === 'undefined') {
      return false;
    }

    if (a === b) {
      return true;
    }
    if (absDiff < tolerance[color]) {
      return true;
    }

    return false;
  }

  function isPixelBrightnessSimilar(d1, d2) {
    var alpha = isColorSimilar(d1.a, d2.a, 'alpha');
    var brightness = isColorSimilar(
      d1.brightness,
      d2.brightness,
      'minBrightness',
    );

    return brightness && alpha;
  }

  function getBrightness(r, g, b) {
    return 0.3 * r + 0.59 * g + 0.11 * b;
  }

  function isRGBSame(d1, d2) {
    var red = d1.r === d2.r;
    var green = d1.g === d2.g;
    var blue = d1.b === d2.b;

    return red && green && blue;
  }

  function isRGBSimilar(d1, d2) {
    var red = isColorSimilar(d1.r, d2.r, 'red');
    var green = isColorSimilar(d1.g, d2.g, 'green');
    var blue = isColorSimilar(d1.b, d2.b, 'blue');
    var alpha = isColorSimilar(d1.a, d2.a, 'alpha');

    return red && green && blue && alpha;
  }

  function isContrasting(d1, d2) {
    return Math.abs(d1.brightness - d2.brightness) > tolerance.maxBrightness;
  }

  function getHue(red, green, blue) {
    var r = red / 255;
    var g = green / 255;
    var b = blue / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var d;

    if (max === min) {
      h = 0; // Achromatic
    } else {
      d = max - min;
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h /= 6;
      }
    }

    return h;
  }

  function isAntialiased(
    sourcePix,
    pix,
    cacheSet,
    verticalPos,
    horizontalPos,
    width,
  ) {
    var offset;
    var distance = 1;
    var i;
    var j;
    var hasHighContrastSibling = 0;
    var hasSiblingWithDifferentHue = 0;
    var hasEquivalentSibling = 0;

    addHueInfo(sourcePix);

    for (i = distance * -1; i <= distance; i++) {
      for (j = distance * -1; j <= distance; j++) {
        if (i === 0 && j === 0) {
          // Ignore source pixel
        } else {
          offset = ((verticalPos + j) * width + (horizontalPos + i)) * 4;

          if (!getPixelInfo(targetPix, pix, offset, cacheSet)) {
            continue;
          }

          addBrightnessInfo(targetPix);
          addHueInfo(targetPix);

          if (isContrasting(sourcePix, targetPix)) {
            hasHighContrastSibling++;
          }

          if (isRGBSame(sourcePix, targetPix)) {
            hasEquivalentSibling++;
          }

          if (Math.abs(targetPix.h - sourcePix.h) > 0.3) {
            hasSiblingWithDifferentHue++;
          }

          if (hasSiblingWithDifferentHue > 1 || hasHighContrastSibling > 1) {
            return true;
          }
        }
      }
    }

    if (hasEquivalentSibling < 2) {
      return true;
    }

    return false;
  }

  function copyPixel(px, offset, pix) {
    if (errorType === 'diffOnly') {
      return;
    }

    px[offset] = pix.r; // R
    px[offset + 1] = pix.g; // G
    px[offset + 2] = pix.b; // B
    px[offset + 3] = pix.a * pixelTransparency; // A
  }

  function copyGrayScalePixel(px, offset, pix) {
    if (errorType === 'diffOnly') {
      return;
    }

    px[offset] = pix.brightness; // R
    px[offset + 1] = pix.brightness; // G
    px[offset + 2] = pix.brightness; // B
    px[offset + 3] = pix.a * pixelTransparency; // A
  }

  function getPixelInfo(dst, pix, offset) {
    if (pix.length > offset) {
      dst.r = pix[offset];
      dst.g = pix[offset + 1];
      dst.b = pix[offset + 2];
      dst.a = pix[offset + 3];

      return true;
    }

    return false;
  }

  function addBrightnessInfo(pix) {
    pix.brightness = getBrightness(pix.r, pix.g, pix.b); // 'corrected' lightness
  }

  function addHueInfo(pix) {
    pix.h = getHue(pix.r, pix.g, pix.b);
  }

  function analyseImages(img1, img2, width, height) {
    var data1 = img1.data;
    var data2 = img2.data;
    var hiddenCanvas;
    var context;
    var imgd;
    var pix;

    if (!compareOnly) {
      hiddenCanvas = createCanvas(width, height);

      context = hiddenCanvas.getContext('2d');
      imgd = context.createImageData(width, height);
      pix = imgd.data;
    }

    var mismatchCount = 0;
    var diffBounds = {
      bottom: 0,
      left: width,
      right: 0,
      top: height,
    };
    var updateBounds = function (x, y) {
      diffBounds.left = Math.min(x, diffBounds.left);
      diffBounds.right = Math.max(x, diffBounds.right);
      diffBounds.top = Math.min(y, diffBounds.top);
      diffBounds.bottom = Math.max(y, diffBounds.bottom);
    };

    var time = Date.now();

    var skip;

    if (
      !!largeImageThreshold &&
      ignoreAntialiasing &&
      (width > largeImageThreshold || height > largeImageThreshold)
    ) {
      skip = 6;
    }

    var pixel1 = { a: 0, b: 0, g: 0, r: 0 };
    var pixel2 = { a: 0, b: 0, g: 0, r: 0 };

    var skipTheRest = false;

    loop(width, height, (horizontalPos, verticalPos) => {
      if (skipTheRest) {
        return;
      }

      if (skip) {
        // Only skip if the image isn't small
        if (verticalPos % skip === 0 || horizontalPos % skip === 0) {
          return;
        }
      }

      var offset = (verticalPos * width + horizontalPos) * 4;

      if (
        !getPixelInfo(pixel1, data1, offset, 1) ||
        !getPixelInfo(pixel2, data2, offset, 2)
      ) {
        return;
      }

      var isWithinComparedArea = withinComparedArea(
        horizontalPos,
        verticalPos,
        width,
        height,
        pixel2,
      );

      if (ignoreColors) {
        addBrightnessInfo(pixel1);
        addBrightnessInfo(pixel2);

        if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
          if (!compareOnly) {
            copyGrayScalePixel(pix, offset, pixel2);
          }
        } else {
          if (!compareOnly) {
            errorPixel(pix, offset, pixel1, pixel2);
          }

          mismatchCount++;
          updateBounds(horizontalPos, verticalPos);
        }

        return;
      }

      if (isRGBSimilar(pixel1, pixel2) || !isWithinComparedArea) {
        if (!compareOnly) {
          copyPixel(pix, offset, pixel1);
        }
      } else if (
        ignoreAntialiasing &&
        (addBrightnessInfo(pixel1), // Jit pixel info augmentation looks a little weird, sorry.
        addBrightnessInfo(pixel2),
        isAntialiased(pixel1, data1, 1, verticalPos, horizontalPos, width) ||
          isAntialiased(pixel2, data2, 2, verticalPos, horizontalPos, width))
      ) {
        if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
          if (!compareOnly) {
            copyGrayScalePixel(pix, offset, pixel2);
          }
        } else {
          if (!compareOnly) {
            errorPixel(pix, offset, pixel1, pixel2);
          }

          mismatchCount++;
          updateBounds(horizontalPos, verticalPos);
        }
      } else {
        if (!compareOnly) {
          errorPixel(pix, offset, pixel1, pixel2);
        }

        mismatchCount++;
        updateBounds(horizontalPos, verticalPos);
      }

      if (compareOnly) {
        var currentMisMatchPercent = (mismatchCount / (height * width)) * 100;

        if (currentMisMatchPercent > returnEarlyThreshold) {
          skipTheRest = true;
        }
      }
    });

    data.rawMisMatchPercentage = (mismatchCount / (height * width)) * 100;
    data.misMatchPercentage = data.rawMisMatchPercentage.toFixed(2);
    data.diffBounds = diffBounds;
    data.analysisTime = Date.now() - time;

    data.getImageDataUrl = function (text) {
      if (compareOnly) {
        throw Error('No diff image available - ran in compareOnly mode');
      }

      var barHeight = 0;

      if (text) {
        barHeight = addLabel(text, context, hiddenCanvas);
      }

      context.putImageData(imgd, 0, barHeight);

      return hiddenCanvas.toDataURL('image/png');
    };

    if (!compareOnly && hiddenCanvas.toBuffer) {
      data.getBuffer = function (includeOriginal) {
        if (includeOriginal) {
          var imageWidth = hiddenCanvas.width + 2;

          hiddenCanvas.width = imageWidth * 3;
          context.putImageData(img1, 0, 0);
          context.putImageData(img2, imageWidth, 0);
          context.putImageData(imgd, imageWidth * 2, 0);
        } else {
          context.putImageData(imgd, 0, 0);
        }

        return hiddenCanvas.toBuffer();
      };
    }
  }

  function addLabel(text, context, hiddenCanvas) {
    var textPadding = 2;

    context.font = '12px sans-serif';

    var textWidth = context.measureText(text).width + textPadding * 2;
    var barHeight = 22;

    if (textWidth > hiddenCanvas.width) {
      hiddenCanvas.width = textWidth;
    }

    hiddenCanvas.height += barHeight;

    context.fillStyle = '#666';
    context.fillRect(0, 0, hiddenCanvas.width, barHeight - 4);
    context.fillStyle = '#fff';
    context.fillRect(0, barHeight - 4, hiddenCanvas.width, 4);

    context.fillStyle = '#fff';
    context.textBaseline = 'top';
    context.font = '12px sans-serif';
    context.fillText(text, textPadding, 1);

    return barHeight;
  }

  function normalise(img, w, h) {
    var c;
    var context;

    if (img.height < h || img.width < w) {
      c = createCanvas(w, h);
      context = c.getContext('2d');
      context.putImageData(img, 0, 0);

      return context.getImageData(0, 0, w, h);
    }

    return img;
  }

  function outputSettings(options) {
    var key;

    if (options.errorColor) {
      for (key in options.errorColor) {
        if (options.errorColor.hasOwnProperty(key)) {
          errorPixelColor[key] =
            options.errorColor[key] === void 0
              ? errorPixelColor[key]
              : options.errorColor[key];
        }
      }
    }

    if (options.errorType && errorPixelTransform[options.errorType]) {
      errorPixel = errorPixelTransform[options.errorType];
      errorType = options.errorType;
    }

    if (options.errorPixel && typeof options.errorPixel === 'function') {
      errorPixel = options.errorPixel;
    }

    pixelTransparency = isNaN(Number(options.transparency))
      ? pixelTransparency
      : options.transparency;

    if (options.largeImageThreshold !== undefined) {
      largeImageThreshold = options.largeImageThreshold;
    }

    if (options.useCrossOrigin !== undefined) {
      useCrossOrigin = options.useCrossOrigin;
    }

    if (options.boundingBox !== undefined) {
      boundingBoxes = [options.boundingBox];
    }

    if (options.ignoredBox !== undefined) {
      ignoredBoxes = [options.ignoredBox];
    }

    if (options.boundingBoxes !== undefined) {
      boundingBoxes = options.boundingBoxes;
    }

    if (options.ignoredBoxes !== undefined) {
      ignoredBoxes = options.ignoredBoxes;
    }

    if (options.ignoreAreasColoredWith !== undefined) {
      ignoreAreasColoredWith = options.ignoreAreasColoredWith;
    }
  }

  function compare(one, two) {
    if (globalOutputSettings !== oldGlobalSettings) {
      outputSettings(globalOutputSettings);
    }

    function onceWeHaveBoth() {
      var width;
      var height;

      if (images.length === 2) {
        if (images[0].error || images[1].error) {
          data = {};
          data.error = images[0].error ? images[0].error : images[1].error;
          triggerDataUpdate();

          return;
        }
        width =
          images[0].width > images[1].width ? images[0].width : images[1].width;
        height =
          images[0].height > images[1].height
            ? images[0].height
            : images[1].height;

        if (
          images[0].width === images[1].width &&
          images[0].height === images[1].height
        ) {
          data.isSameDimensions = true;
        } else {
          data.isSameDimensions = false;
        }

        data.dimensionDifference = {
          height: images[0].height - images[1].height,
          width: images[0].width - images[1].width,
        };

        analyseImages(
          normalise(images[0], width, height),
          normalise(images[1], width, height),
          width,
          height,
        );

        triggerDataUpdate();
      }
    }

    images = [];
    loadImageData(one, onceWeHaveBoth);
    loadImageData(two, onceWeHaveBoth);
  }

  function getCompareApi(param) {
    var secondFileData;
    var hasMethod = typeof param === 'function';

    if (!hasMethod) {
      // Assume it's file data
      secondFileData = param;
    }

    var self = {
      ignoreAlpha() {
        tolerance.red = 16;
        tolerance.green = 16;
        tolerance.blue = 16;
        tolerance.alpha = 255;
        tolerance.minBrightness = 16;
        tolerance.maxBrightness = 240;

        ignoreAntialiasing = false;
        ignoreColors = false;

        if (hasMethod) {
          param();
        }

        return self;
      },
      ignoreAntialiasing() {
        tolerance.red = 32;
        tolerance.green = 32;
        tolerance.blue = 32;
        tolerance.alpha = 32;
        tolerance.minBrightness = 64;
        tolerance.maxBrightness = 96;

        ignoreAntialiasing = true;
        ignoreColors = false;

        if (hasMethod) {
          param();
        }

        return self;
      },
      ignoreColors() {
        tolerance.alpha = 16;
        tolerance.minBrightness = 16;
        tolerance.maxBrightness = 240;

        ignoreAntialiasing = false;
        ignoreColors = true;

        if (hasMethod) {
          param();
        }

        return self;
      },
      ignoreLess() {
        tolerance.red = 16;
        tolerance.green = 16;
        tolerance.blue = 16;
        tolerance.alpha = 16;
        tolerance.minBrightness = 16;
        tolerance.maxBrightness = 240;

        ignoreAntialiasing = false;
        ignoreColors = false;

        if (hasMethod) {
          param();
        }

        return self;
      },
      ignoreNothing() {
        tolerance.red = 0;
        tolerance.green = 0;
        tolerance.blue = 0;
        tolerance.alpha = 0;
        tolerance.minBrightness = 0;
        tolerance.maxBrightness = 255;

        ignoreAntialiasing = false;
        ignoreColors = false;

        if (hasMethod) {
          param();
        }

        return self;
      },
      onComplete(callback) {
        updateCallbackArray.push(callback);

        var wrapper = function () {
          compare(fileData, secondFileData);
        };

        wrapper();

        return getCompareApi(wrapper);
      },
      outputSettings(options) {
        outputSettings(options);

        return self;
      },
      repaint() {
        if (hasMethod) {
          param();
        }

        return self;
      },
      scaleToSameSize() {
        scaleToSameSize = true;

        if (hasMethod) {
          param();
        }

        return self;
      },
      setReturnEarlyThreshold(threshold) {
        if (threshold) {
          compareOnly = true;
          returnEarlyThreshold = threshold;
        }

        return self;
      },
      setupCustomTolerance(customSettings) {
        for (var property in tolerance) {
          if (!customSettings.hasOwnProperty(property)) {
            continue;
          }

          tolerance[property] = customSettings[property];
        }
      },
      useOriginalSize() {
        scaleToSameSize = false;

        if (hasMethod) {
          param();
        }

        return self;
      },
    };

    return self;
  }

  var rootSelf = {
    compareTo(secondFileData) {
      return getCompareApi(secondFileData);
    },
    onComplete(callback) {
      updateCallbackArray.push(callback);
      loadImageData(fileData, (imageData, width, height) => {
        parseImage(imageData.data, width, height);
      });
    },
    outputSettings(options) {
      outputSettings(options);

      return rootSelf;
    },
  };

  return rootSelf;
};

function setGlobalOutputSettings(settings) {
  globalOutputSettings = settings;

  return resemble;
}

function applyIgnore(api, ignore, customTolerance) {
  switch (ignore) {
    case 'nothing':
      api.ignoreNothing();
      break;
    case 'less':
      api.ignoreLess();
      break;
    case 'antialiasing':
      api.ignoreAntialiasing();
      break;
    case 'colors':
      api.ignoreColors();
      break;
    case 'alpha':
      api.ignoreAlpha();
      break;
    default:
      throw new Error('Invalid ignore: ' + ignore);
  }

  api.setupCustomTolerance(customTolerance);
}

resemble.compare = function (image1, image2, options, cb) {
  var callback;
  var opt;

  if (typeof options === 'function') {
    callback = options;
    opt = {};
  } else {
    callback = cb;
    opt = options || {};
  }

  var res = resemble(image1);
  var compare;

  if (opt.output) {
    res.outputSettings(opt.output);
  }

  compare = res.compareTo(image2);

  if (opt.returnEarlyThreshold) {
    compare.setReturnEarlyThreshold(opt.returnEarlyThreshold);
  }

  if (opt.scaleToSameSize) {
    compare.scaleToSameSize();
  }

  var toleranceSettings = opt.tolerance || {};

  if (typeof opt.ignore === 'string') {
    applyIgnore(compare, opt.ignore, toleranceSettings);
  } else if (opt.ignore && opt.ignore.forEach) {
    opt.ignore.forEach((v) => {
      applyIgnore(compare, v, toleranceSettings);
    });
  }

  compare.onComplete((data) => {
    if (data.error) {
      callback(data.error);
    } else {
      callback(null, data);
    }
  });
};

resemble.outputSettings = setGlobalOutputSettings;

export default resemble;
