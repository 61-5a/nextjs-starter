import React, { useState, createContext } from "react";
export const StoreContext = createContext();
export const StoreContextProvider = (props) => {
  const [test, setTest] = useState("testText");

  // Store user 1 start
  // Store user 1 end

  // Store user 2 start
  // Store user 2 end

  // Store user 3 start
  // Store user 3 end

  const Store = {
    test,
    setTest,

    // Store user 1 start
    // Store user 1 end

    // Store user 2 start
    // Store user 2 end

    // Store user 3 start
    // Store user 3 end
  };
  return <StoreContext.Provider value={[Store]}>{props.children}</StoreContext.Provider>;
};
