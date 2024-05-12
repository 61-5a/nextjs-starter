"use client";
import React, { useState, useEffect, useMemo, createContext, ReactNode } from "react";
import { StoreContextValue } from "../_interfaces/store/store";

export const StoreContext = createContext<StoreContextValue | undefined>(undefined); // Create the context
export const StoreContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  // Create the Store states
  const [history, setHistory] = useState<string[]>(["/"]); // history keeping state
  const [remove, setRemove] = useState<string>("dummy text");

  //   // Create the Store states userProfile sync with localStorage
  //   const [userProfile, setUserProfile] = useState(() => {
  //     if (typeof window !== "undefined") {
  //       const storedUserProfile = localStorage.getItem("userProfile");
  //       const data = storedUserProfile ? JSON?.parse(storedUserProfile) : [];
  //       return data;
  //     } else {
  //       return [];
  //     }
  //   });
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("userProfile", JSON.stringify(userProfile));
  //     }
  //   }, [userProfile]);

  // Create the Store object
  const Store: StoreContextValue = useMemo(() => {
    return {
      history,
      setHistory,
      remove,
      setRemove,
    };
  }, [history, setHistory, remove, setRemove]);

  return <StoreContext.Provider value={Store}>{props.children}</StoreContext.Provider>;
};
