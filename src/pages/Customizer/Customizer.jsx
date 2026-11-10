import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header/Header.jsx';
import ProductPreview from '../../components/ProductPreview/ProductPreview.jsx';
import ColorSelector from '../../components/ColorSelector/ColorSelector.jsx';
import SizeSelector from '../../components/SizeSelector/SizeSelector.jsx';
import PrintSelector from '../../components/PrintSelector/PrintSelector.jsx';
import PriceSummary from '../../components/PriceSummary/PriceSummary.jsx';
import Toast from '../../components/Toast/Toast.jsx';

import {
  PRODUCT_INFO,
  COLORS,
  SIZES,
  PRINTS,
  DEFAULT_CUSTOMIZATION,
} from '../../data/product.js';
import { loadSavedCustomization, saveCustomization } from '../../utils/storage.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import './Customizer.css';

export default function Customizer() {
  // Lazy state initializer restoring valid selections from localStorage
  const [customization, setCustomization] = useState(() =>
    loadSavedCustomization(DEFAULT_CUSTOMIZATION, {
      colors: COLORS,
      sizes: SIZES,
      prints: PRINTS,
    })
  );

  // Success feedback state for Add to Bag
  const [isAdding, setIsAdding] = useState(false);
  const [activeToastOrder, setActiveToastOrder] = useState(null);
  const buttonTimerRef = useRef(null);

  // Sync state changes to localStorage
  useEffect(() => {
    saveCustomization(customization);
  }, [customization]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (buttonTimerRef.current) {
        clearTimeout(buttonTimerRef.current);
      }
    };
  }, []);

  // Derived object lookups (never duplicate raw data)
  const selectedColorData =
    COLORS.find((c) => c.id === customization.color) || COLORS[0];
  const selectedSizeData =
    SIZES.find((s) => s.id === customization.size) || SIZES[0];
  const selectedPrintData =
    PRINTS.find((p) => p.id === customization.print) || PRINTS[0];

  // Derived price calculation (NOT stored in React state)
  const sizeSurcharge = selectedSizeData.surcharge || 0;
  const printPrice = selectedPrintData.price || 0;
  const packagingCost = customization.giftPackaging
    ? PRODUCT_INFO.giftPackagingPrice
    : 0;

  const total = PRODUCT_INFO.basePrice + sizeSurcharge + printPrice + packagingCost;

  // Handlers for selection changes
  const handleColorChange = (newColorId) => {
    setCustomization((prev) => ({ ...prev, color: newColorId }));
  };

  const handleSizeChange = (newSizeId) => {
    setCustomization((prev) => ({ ...prev, size: newSizeId }));
  };

  const handlePrintChange = (newPrintId) => {
    setCustomization((prev) => ({ ...prev, print: newPrintId }));
  };

  const handlePackagingToggle = (e) => {
    const isChecked = e.target.checked;
    setCustomization((prev) => ({ ...prev, giftPackaging: isChecked }));
  };

  // Reset every selection to defaults
  const handleReset = () => {
    setCustomization({ ...DEFAULT_CUSTOMIZATION });
  };

  // Add to Bag action: snapshot current configuration and total
  const handleAddToBag = () => {
    if (isAdding) return;

    // Snapshot current state immutably for the toast
    const snapshot = {
      colorName: selectedColorData.name,
      sizeLabel: selectedSizeData.label,
      printName: selectedPrintData.name,
      giftPackaging: customization.giftPackaging,
      total,
      timestamp: Date.now(),
    };

    setActiveToastOrder(snapshot);
    setIsAdding(true);

    if (buttonTimerRef.current) {
      clearTimeout(buttonTimerRef.current);
    }

    buttonTimerRef.current = setTimeout(() => {
      setIsAdding(false);
    }, 1600);
  };

  return (
    <div className="customizer-app">
      <Header />

      <main className="customizer-main" id="main-content">
        <div className="customizer-container">
          {/* Left Column: Product SVG Preview */}
          <div className="customizer-preview-col">
            <ProductPreview
              print={customization.print}
              colorData={selectedColorData}
              sizeData={selectedSizeData}
              printData={selectedPrintData}
            />
          </div>

          {/* Right Column: Information & Customization Form */}
          <div className="customizer-controls-col">
            <section className="customizer-card" aria-label="Product details and customization">
              <header className="customizer-card__header">
                <div className="customizer-card__title-row">
                  <h1 className="customizer-card__title">{PRODUCT_INFO.name}</h1>
                  <span className="customizer-card__base-badge">
                    Base {formatCurrency(PRODUCT_INFO.basePrice)}
                  </span>
                </div>
                <p className="customizer-card__desc">{PRODUCT_INFO.description}</p>
              </header>

              <form
                className="customizer-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToBag();
                }}
              >
                {/* 1. Colour Selector */}
                <ColorSelector
                  colors={COLORS}
                  selectedColor={customization.color}
                  onSelect={handleColorChange}
                />

                <div className="customizer-form__divider" aria-hidden="true" />

                {/* 2. Size Selector */}
                <SizeSelector
                  sizes={SIZES}
                  selectedSize={customization.size}
                  onSelect={handleSizeChange}
                />

                <div className="customizer-form__divider" aria-hidden="true" />

                {/* 3. Print Selector */}
                <PrintSelector
                  prints={PRINTS}
                  selectedPrint={customization.print}
                  onSelect={handlePrintChange}
                />

                <div className="customizer-form__divider" aria-hidden="true" />

                {/* 4. Gift Packaging Option */}
                <div className="customizer-gift">
                  <label htmlFor="gift-packaging" className="customizer-gift__label">
                    <input
                      type="checkbox"
                      id="gift-packaging"
                      name="gift-packaging"
                      checked={customization.giftPackaging}
                      onChange={handlePackagingToggle}
                      className="customizer-gift__checkbox"
                    />
                    <div className="customizer-gift__text">
                      <div className="customizer-gift__title-row">
                        <span className="customizer-gift__title">
                          Add Gift Packaging
                        </span>
                        <span className="customizer-gift__price">
                          +{formatCurrency(PRODUCT_INFO.giftPackagingPrice)}
                        </span>
                      </div>
                      <p className="customizer-gift__desc">
                        Recyclable kraft box with embossed ribbon and custom greeting sleeve.
                      </p>
                    </div>
                  </label>
                </div>

                {/* 5. Live Price Summary Breakdown */}
                <PriceSummary
                  basePrice={PRODUCT_INFO.basePrice}
                  sizeData={selectedSizeData}
                  printData={selectedPrintData}
                  giftPackaging={customization.giftPackaging}
                  giftPackagingPrice={PRODUCT_INFO.giftPackagingPrice}
                  total={total}
                />

                {/* 6. Action Controls: Reset & Add to Bag */}
                <div className="customizer-actions">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="customizer-btn customizer-btn--secondary"
                    aria-label="Reset all options to default settings"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={isAdding}
                    className={`customizer-btn customizer-btn--primary ${
                      isAdding ? 'customizer-btn--success' : ''
                    }`}
                    aria-live="polite"
                  >
                    {isAdding ? (
                      <span className="customizer-btn__content">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.5 9.5L7 13L14.5 5"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Added to Bag!
                      </span>
                    ) : (
                      <span className="customizer-btn__content">
                        Add to Bag • {formatCurrency(total)}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>

      {/* Floating Success Notification Toast */}
      {activeToastOrder && (
        <Toast
          order={activeToastOrder}
          onDismiss={() => setActiveToastOrder(null)}
        />
      )}
    </div>
  );
}
