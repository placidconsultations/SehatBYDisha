import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function smoothScrollToTop() {
  const duration = 800; // increase this for slower, smoother animation (ms)
  const start = window.scrollY;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // ease-out cubic scrolling
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToTop();
  }, [pathname]);

  return null;
}
