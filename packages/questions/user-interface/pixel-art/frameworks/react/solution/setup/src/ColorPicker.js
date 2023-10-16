export default function ColorPicker({
  colors,
  selectedColor,
  setColor,
  isDrawing,
  setIsDrawing,
}) {
  function onColorClick(color) {
    setIsDrawing(true);
    setColor(color);
  }

  function buttonClassName(drawingButtonClicked) {
    if (isDrawing === drawingButtonClicked) {
      return 'color-picker__option color-picker__option--selected';
    } else {
      return 'color-picker__option color-picker__option--not-selected';
    }
  }

  return (
    <div className="color-picker-container">
      <div>
        <button
          onClick={() => setIsDrawing(true)}
          className={buttonClassName(true)}>
          Draw
        </button>
        <button
          onClick={() => setIsDrawing(false)}
          className={buttonClassName(false)}>
          Erase
        </button>
      </div>
      <div className="color-picker">
        {colors.map((color, index) => {
          const colorSelectedClassName =
            color === selectedColor ? 'color--selected' : 'color--not-selected';
          const colorClassName = `color ${colorSelectedClassName} ${color}`;
          return (
            <button
              key={index}
              className={colorClassName}
              onClick={() => onColorClick(color)}
            />
          );
        })}
      </div>
    </div>
  );
}
