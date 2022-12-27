import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }
  const [mobile, setMobile] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);
  useEffect(() => {
    if (windowDimensions.width >= 1024) {
      setMobile(false);
      setDesktop(true);
    } else {
      setMobile(true);
      setDesktop(false);
    }
  }, [windowDimensions]);
  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    mobile: mobile,
    desktop: desktop,
  };
}
