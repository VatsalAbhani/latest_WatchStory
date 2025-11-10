import { useEffect, useRef } from "react";

export default function TrustpilotReviewButton() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.querySelector(
      'script[src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"]'
    );
    // If Trustpilot script already loaded, reload widget
    if (script && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbba0bdcd568bc"
      data-businessunit-id="69120bb73e1c13bc5f436817"
      data-style-height="32px"
      data-style-width="100%"
      data-theme="dark"
      data-token="86546cb0-7206-4502-98d0-b3b4a5589b62"
    >
      <a
        href="https://www.trustpilot.com/review/watchstory.ae"
        target="_blank"
        rel="noopener noreferrer"
      >
        Review us on Trustpilot
      </a>
    </div>
  );
}
