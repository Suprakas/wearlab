import './ProductPreview.css';

export default function ProductPreview({ print, colorData, sizeData, printData }) {
  const isDarkPrint = colorData?.printContrast === 'dark';

  // Determine chest print stroke and fill colors based on garment tone
  const printColor = isDarkPrint
    ? (print === 'react' ? '#087EA4' : '#1E232B')
    : (print === 'react' ? '#61DAFB' : '#FFFFFF');

  const printSecondaryColor = isDarkPrint ? '#1E232B' : '#FFFFFF';

  // Subdued inner neck collar shade based on shirt color
  const collarInnerFill = isDarkPrint ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.22)';
  const seamColor = isDarkPrint ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.22)';
  const shadowOverlay = isDarkPrint ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0.14)';

  const accessibleDescription = `Preview of Everyday Cotton Tee in ${colorData?.name || 'Cloud White'}, Size ${sizeData?.label || 'M'}, ${printData?.name || 'Plain'} print`;

  return (
    <section className="product-preview" aria-labelledby="preview-heading">
      <div className="product-preview__header">
        <h2 id="preview-heading" className="visually-hidden">
          Product Preview
        </h2>
        <span className="product-preview__badge" aria-hidden="true">
          <span className="product-preview__badge-dot" />
          Live preview
        </span>
      </div>

      <div
        className="product-preview__stage"
        role="img"
        aria-label={accessibleDescription}
      >
        <svg
          className="product-preview__svg"
          viewBox="0 0 400 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle soft drop shadow for garment */}
            <filter id="garment-shadow" x="-5%" y="-2%" width="110%" height="112%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1C1E21" floodOpacity="0.09" />
            </filter>

            {/* Natural torso shading overlay */}
            <linearGradient id="body-shading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={shadowOverlay} />
              <stop offset="18%" stopColor="transparent" />
              <stop offset="82%" stopColor="transparent" />
              <stop offset="100%" stopColor={shadowOverlay} />
            </linearGradient>

            {/* Sleeve depth gradient */}
            <linearGradient id="sleeve-depth-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor={shadowOverlay} />
            </linearGradient>
            <linearGradient id="sleeve-depth-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor={shadowOverlay} />
            </linearGradient>
          </defs>

          {/* Background Inner Back Collar (visible behind neckline cutout) */}
          <path
            d="M152 74 C175 60, 225 60, 248 74 C236 86, 164 86, 152 74 Z"
            fill={collarInnerFill}
            aria-hidden="true"
          />

          {/* Main T-Shirt Body & Sleeves Outline */}
          <path
            className="product-preview__garment-fill"
            d="M 148 72
               C 174 100, 226 100, 252 72
               L 316 98
               L 378 152
               C 382 155, 382 161, 377 165
               L 336 200
               C 331 204, 324 202, 321 197
               L 302 166
               L 302 376
               C 302 382, 297 386, 291 386
               L 109 386
               C 103 386, 98 382, 98 376
               L 98 166
               L 79 197
               C 76 202, 69 204, 64 200
               L 23 165
               C 18 161, 18 155, 22 152
               L 84 98
               Z"
            style={{ fill: colorData?.hex || '#F5F2EA' }}
            filter="url(#garment-shadow)"
          />

          {/* Fabric Shading / Highlights */}
          <path
            d="M 148 72
               C 174 100, 226 100, 252 72
               L 316 98
               L 378 152
               C 382 155, 382 161, 377 165
               L 336 200
               C 331 204, 324 202, 321 197
               L 302 166
               L 302 376
               C 302 382, 297 386, 291 386
               L 109 386
               C 103 386, 98 382, 98 376
               L 98 166
               L 79 197
               C 76 202, 69 204, 64 200
               L 23 165
               C 18 161, 18 155, 22 152
               L 84 98
               Z"
            fill="url(#body-shading)"
            aria-hidden="true"
            pointerEvents="none"
          />

          {/* Collar Ribbing Band */}
          <path
            d="M 148 72
               C 174 102, 226 102, 252 72
               C 246 80, 228 89, 200 89
               C 172 89, 154 80, 148 72 Z"
            fill={shadowOverlay}
            stroke={seamColor}
            strokeWidth="1.2"
            aria-hidden="true"
          />

          {/* Underarm and Sleeve Seams */}
          <g stroke={seamColor} strokeWidth="1.5" strokeDasharray="3,2" aria-hidden="true">
            {/* Left sleeve cuff seam */}
            <line x1="33" y1="172" x2="72" y2="204" />
            {/* Right sleeve cuff seam */}
            <line x1="367" y1="172" x2="328" y2="204" />
            {/* Bottom hem double stitch */}
            <line x1="104" y1="376" x2="296" y2="376" />
            <line x1="104" y1="379" x2="296" y2="379" strokeWidth="1" />
          </g>

          {/* Chest Print Graphic */}
          <g
            className="product-preview__print-group"
            transform="translate(200, 190)"
            aria-hidden="true"
          >
            {print === 'react' && (
              <g className="product-preview__print-react">
                {/* Nucleus / Center core */}
                <circle cx="0" cy="0" r="6" fill={printColor} />
                {/* 3 Orbital Ellipses */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="36"
                  ry="13"
                  fill="none"
                  stroke={printColor}
                  strokeWidth="2.8"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="36"
                  ry="13"
                  transform="rotate(60)"
                  fill="none"
                  stroke={printColor}
                  strokeWidth="2.8"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="36"
                  ry="13"
                  transform="rotate(120)"
                  fill="none"
                  stroke={printColor}
                  strokeWidth="2.8"
                />
              </g>
            )}

            {print === 'developer' && (
              <g className="product-preview__print-developer">
                {/* Left bracket < */}
                <path
                  d="M -22 -14 L -34 -4 L -22 6"
                  fill="none"
                  stroke={printColor}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Slash / */}
                <line
                  x1="-5"
                  y1="10"
                  x2="5"
                  y2="-18"
                  stroke={printColor}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Right bracket > */}
                <path
                  d="M 22 -14 L 34 -4 L 22 6"
                  fill="none"
                  stroke={printColor}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* "DEVELOPER" subtext */}
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill={printSecondaryColor}
                  fontSize="8.5"
                  fontWeight="700"
                  letterSpacing="2.5"
                  fontFamily="monospace"
                >
                  DEVELOPER
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      <div className="product-preview__caption" aria-hidden="true">
        <p className="product-preview__spec">
          <span className="product-preview__spec-item">{colorData?.name}</span>
          <span className="product-preview__spec-dot">•</span>
          <span className="product-preview__spec-item">Size {sizeData?.label}</span>
          <span className="product-preview__spec-dot">•</span>
          <span className="product-preview__spec-item">{printData?.name} print</span>
        </p>
        <span className="product-preview__note">
          Visual preview reflects selected colour and chest graphic.
        </span>
      </div>
    </section>
  );
}
