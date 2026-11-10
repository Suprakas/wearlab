import './SizeSelector.css';

export default function SizeSelector({ sizes, selectedSize, onSelect }) {
  const currentSize = sizes.find((s) => s.id === selectedSize) || sizes[0];

  return (
    <fieldset className="size-selector">
      <legend className="size-selector__legend">
        <span className="size-selector__label">Size</span>
        <span className="size-selector__current" aria-live="polite">
          Selected: <strong>{currentSize.label}</strong>
          {currentSize.surcharge > 0 && (
            <span className="size-selector__current-surcharge"> (+₹{currentSize.surcharge})</span>
          )}
        </span>
      </legend>

      <div className="size-selector__grid" role="radiogroup" aria-label="T-shirt size selection">
        {sizes.map((size) => {
          const isSelected = size.id === selectedSize;

          return (
            <div key={size.id} className="size-selector__option">
              <input
                type="radio"
                id={`size-${size.id}`}
                name="tshirt-size"
                value={size.id}
                checked={isSelected}
                onChange={() => onSelect(size.id)}
                className="visually-hidden size-selector__input"
              />
              <label
                htmlFor={`size-${size.id}`}
                className={`size-selector__button-label ${
                  isSelected ? 'size-selector__button-label--selected' : ''
                }`}
              >
                <span className="size-selector__name">{size.label}</span>
                {size.surcharge > 0 && (
                  <span className="size-selector__surcharge-badge">
                    +₹{size.surcharge}
                  </span>
                )}
              </label>
            </div>
          );
        })}
      </div>

      <p className="size-selector__helper">
        Standard sizing S through XL. Size XXL incurs a ₹100 surcharge for extra material & tailoring.
      </p>
    </fieldset>
  );
}
