import { useState, useEffect } from "react";

interface WindowDimensions {
  width: number | null;
  height: number | null;
}

export default function useWindowDimensions() {
  const isClient = typeof window === "object";

  const getWindowDimensions = (): WindowDimensions => {
    return {
      width: isClient ? window.innerWidth : null,
      height: isClient ? window.innerHeight : null,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  const isMobile = windowDimensions.width && windowDimensions.width < 1024;
  const isDesktop = windowDimensions.width && windowDimensions.width >= 1024;

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    mobile: isMobile,
    desktop: isDesktop,
  };
}
