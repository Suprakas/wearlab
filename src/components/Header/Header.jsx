import './Header.css';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <div className="header__brand">
          <a href="#" className="header__logo-link" aria-label="WearLab Home">
            <span className="header__logo-icon" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4L4 9V14L8 12.5V23C8 23.5523 8.44772 24 9 24H19C19.5523 24 20 23.5523 20 23V12.5L24 14V9L19 4C17.5 7 10.5 7 9 4Z"
                  fill="var(--color-accent)"
                />
                <circle cx="14" cy="11.5" r="1.5" fill="var(--color-accent-contrast)" />
              </svg>
            </span>
            <span className="header__wordmark">WearLab</span>
          </a>
          <span className="header__divider" aria-hidden="true">/</span>
          <span className="header__tagline">Make it yours.</span>
        </div>
      </div>
    </header>
  );
}
