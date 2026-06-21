import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the top of the page on every route change.
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
