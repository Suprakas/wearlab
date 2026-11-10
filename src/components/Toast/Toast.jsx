import { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import './Toast.css';

export default function Toast({ order, onDismiss }) {
  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef(6000);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    if (!order) return;

    if (isPaused) {
      // Calculate how much time had elapsed before pausing
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      clearTimeout(timerRef.current);
    } else {
      // Resume or start countdown
      startTimeRef.current = Date.now();
      const delay = Math.max(remainingTimeRef.current, 600);

      timerRef.current = setTimeout(() => {
        onDismiss();
      }, delay);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [order, isPaused, onDismiss]);

  if (!order) return null;

  return (
    <aside
      className="toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="toast__icon-container" aria-hidden="true">
        <svg
          className="toast__check-icon"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="var(--color-success)" />
          <path
            d="M6 10.5L8.5 13L14 7"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="toast__content">
        <div className="toast__header">
          <p className="toast__title">Added to Bag</p>
          <span className="toast__total-badge">
            {formatCurrency(order.total)}
          </span>
        </div>

        <ul className="toast__details" aria-label="Item specifications">
          <li className="toast__detail-item">
            <span className="toast__detail-key">Colour:</span>
            <span className="toast__detail-val">{order.colorName}</span>
          </li>
          <li className="toast__detail-item">
            <span className="toast__detail-key">Size:</span>
            <span className="toast__detail-val">{order.sizeLabel}</span>
          </li>
          <li className="toast__detail-item">
            <span className="toast__detail-key">Print:</span>
            <span className="toast__detail-val">{order.printName}</span>
          </li>
          <li className="toast__detail-item">
            <span className="toast__detail-key">Gift packaging:</span>
            <span className="toast__detail-val">
              {order.giftPackaging ? 'Yes' : 'No'}
            </span>
          </li>
        </ul>
      </div>

      <button
        type="button"
        className="toast__dismiss"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </aside>
  );
}
