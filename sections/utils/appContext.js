import { useState, createContext, useContext } from "react";

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({
    currency: [
      { title: "USDC", logo: "/icons/usdc.png", active: true },
      { title: "USDT", logo: "/icons/usdt.png", active: false },
      { title: "DAI", logo: "/icons/dai.png", active: false },
    ],
    milestones: [],
    rewards: [{
      title: "Godspeed",
      description: "Jesus will smile on you",
      amount: 100,
      type: "Donate",  // OR Donate OR Stream // OR Microfund
      cap: 100,
      tokenAmount: "10", // optional 
      tokenName: "EYE", // optional
      tokenUrl: "https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174", // optional
    }],
    pTitle: "Default project title",
    pDesc: "",
    pWeb: "https://www.d3vlibrary.com",
    pSocial: "https://twitter.com/d3v_library",
    pType: "Standard", // Stream vs Standard
    pImageUrl: "",
    pm1: 1000,
    pmDesc: 'Some description',
    cateogry: "Games",
    subcategory: "Board"
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
