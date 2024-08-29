import { useState, useEffect, useMemo } from "react";

interface WindowDimensions {
  width: number | null;
  height: number | null;
}

export default function useWindowDimensions() {
  const isClient = typeof window === "object";

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: isClient ? window.innerWidth : null,
    height: isClient ? window.innerHeight : null,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  const isMobile = windowDimensions.width && windowDimensions.width < 1024;
  const isDesktop = windowDimensions.width && windowDimensions.width >= 1024;

  return useMemo(
    () => ({
      width: windowDimensions.width,
      height: windowDimensions.height,
      mobile: isMobile,
      desktop: isDesktop,
    }),
    [windowDimensions.width, windowDimensions.height, isMobile, isDesktop]
  );
}
