import { formatCurrency } from '../../utils/formatCurrency.js';
import './PriceSummary.css';

export default function PriceSummary({
  basePrice,
  sizeData,
  printData,
  giftPackaging,
  giftPackagingPrice,
  total,
}) {
  return (
    <section className="price-summary" aria-labelledby="summary-heading">
      <h3 id="summary-heading" className="price-summary__title">
        Price Breakdown
      </h3>

      <div className="price-summary__rows">
        {/* Base garment price */}
        <div className="price-summary__row">
          <span className="price-summary__item-label">
            Everyday Cotton Tee (Base)
          </span>
          <span className="price-summary__item-price">
            {formatCurrency(basePrice)}
          </span>
        </div>

        {/* Size surcharge (only show when > 0, or show as included) */}
        {sizeData && sizeData.surcharge > 0 && (
          <div className="price-summary__row price-summary__row--extra">
            <span className="price-summary__item-label">
              Size surcharge ({sizeData.label})
            </span>
            <span className="price-summary__item-price">
              +{formatCurrency(sizeData.surcharge)}
            </span>
          </div>
        )}

        {/* Print option surcharge (only show when > 0) */}
        {printData && printData.price > 0 && (
          <div className="price-summary__row price-summary__row--extra">
            <span className="price-summary__item-label">
              {printData.name} chest print
            </span>
            <span className="price-summary__item-price">
              +{formatCurrency(printData.price)}
            </span>
          </div>
        )}

        {/* Gift packaging if selected */}
        {giftPackaging && (
          <div className="price-summary__row price-summary__row--extra">
            <span className="price-summary__item-label">
              Eco-friendly gift packaging
            </span>
            <span className="price-summary__item-price">
              +{formatCurrency(giftPackagingPrice)}
            </span>
          </div>
        )}
      </div>

      <div className="price-summary__divider" aria-hidden="true" />

      {/* Prominent Total */}
      <div className="price-summary__total-row" aria-live="polite">
        <div className="price-summary__total-details">
          <span className="price-summary__total-label">Total Amount</span>
          <span className="price-summary__taxes-note">Inclusive of all taxes</span>
        </div>
        <span className="price-summary__total-amount">
          {formatCurrency(total)}
        </span>
      </div>
    </section>
  );
}
