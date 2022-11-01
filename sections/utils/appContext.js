import { useState, createContext, useContext } from "react";

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({
    milestones: [],
    rewards: [{
      title: "Godspeed",
      description: "Jesus will smile on you",
      amount: 100,
      type: "Donate",  // OR Donate OR Stream // OR Microfund
      cap: 10,
    }],
    pTitle: "Default project title",
    pDesc: "",
    pWeb: "https://www.d3vlibrary.com",
    pSocial: "https://twitter.com/d3v_library",
    pType: "Standard", // Stream vs Standard
    pImageUrl: "",
    pm1: 0,
    pmDesc: 'Some description',
    cateogry: "Games",
    subcategory: "Board",
    tokenReward: {
      amount: 0,
      name: "EYE",
      address: process.env.NEXT_PUBLIC_AD_TOKEN,
    }
  });

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("You need to useApp inside a function");
  }

  return context;
};
