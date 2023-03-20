let data = {
  url: 'https://www.bytedance.com/',
  title: 'Inspire creativity, enrich life.',
  text: 'ByteDance',
};

let strTemp = '<a href="{url}" title="{title}">{text}</a>';

// Implement this
function substitute(str, obj) {
  let result = str;
  for (const key in obj) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), obj[key]);
  }

  return result;
}

console.log(substitute(strTemp, data));
// <a href="https://www.bytedance.com/" title="Inspire creativity, enrich life.">ByteDance</a>
