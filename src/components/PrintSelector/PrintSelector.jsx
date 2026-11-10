import { formatCurrency } from '../../utils/formatCurrency.js';
import './PrintSelector.css';

export default function PrintSelector({ prints, selectedPrint, onSelect }) {
  return (
    <fieldset className="print-selector">
      <legend className="print-selector__legend">
        <span className="print-selector__label">Chest Print</span>
        <span className="print-selector__subtext">Choose an optional chest graphic</span>
      </legend>

      <div className="print-selector__cards" role="radiogroup" aria-label="Chest print design options">
        {prints.map((printOption) => {
          const isSelected = printOption.id === selectedPrint;
          const isIncluded = printOption.price === 0;

          return (
            <div key={printOption.id} className="print-selector__option">
              <input
                type="radio"
                id={`print-${printOption.id}`}
                name="tshirt-print"
                value={printOption.id}
                checked={isSelected}
                onChange={() => onSelect(printOption.id)}
                className="visually-hidden print-selector__input"
              />
              <label
                htmlFor={`print-${printOption.id}`}
                className={`print-selector__card ${
                  isSelected ? 'print-selector__card--selected' : ''
                }`}
              >
                <div className="print-selector__card-content">
                  <div className="print-selector__card-header">
                    <span className="print-selector__name">{printOption.name}</span>
                    <span
                      className={`print-selector__price-tag ${
                        isIncluded ? 'print-selector__price-tag--free' : ''
                      }`}
                    >
                      {isIncluded ? 'Included' : `+${formatCurrency(printOption.price)}`}
                    </span>
                  </div>
                  <p className="print-selector__desc">{printOption.description}</p>
                </div>

                <span className="print-selector__radio-circle" aria-hidden="true">
                  {isSelected && <span className="print-selector__radio-inner" />}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
