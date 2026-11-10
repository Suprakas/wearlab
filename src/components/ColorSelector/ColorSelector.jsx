import './ColorSelector.css';

export default function ColorSelector({ colors, selectedColor, onSelect }) {
  const currentColor = colors.find((c) => c.id === selectedColor) || colors[0];

  return (
    <fieldset className="color-selector">
      <legend className="color-selector__legend">
        <span className="color-selector__label">Colour</span>
        <span className="color-selector__current-name" aria-live="polite">
          {currentColor.name}
        </span>
      </legend>

      <div className="color-selector__swatches" role="radiogroup" aria-label="T-shirt colour selection">
        {colors.map((color) => {
          const isSelected = color.id === selectedColor;
          const checkColor = color.printContrast === 'dark' ? '#1C1E21' : '#FFFFFF';

          return (
            <div key={color.id} className="color-selector__option">
              <input
                type="radio"
                id={`color-${color.id}`}
                name="tshirt-color"
                value={color.id}
                checked={isSelected}
                onChange={() => onSelect(color.id)}
                className="visually-hidden color-selector__input"
              />
              <label
                htmlFor={`color-${color.id}`}
                className={`color-selector__swatch-label ${
                  isSelected ? 'color-selector__swatch-label--selected' : ''
                }`}
                title={color.name}
                aria-label={color.name}
              >
                <span
                  className="color-selector__swatch"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: color.border,
                  }}
                >
                  {isSelected && (
                    <svg
                      className="color-selector__check"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke={checkColor}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
