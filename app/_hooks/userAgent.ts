import { useState, useEffect } from "react";

export default function useUserAgent() {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setUserAgent(userAgent);
  }, []);

  return userAgent;
}
