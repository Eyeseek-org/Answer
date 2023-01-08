import { useState, createContext, useContext } from 'react';

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({
    milestones: [],
    pTitle: 'Project title',
    pDesc: '',
    pWeb: 'https://www.d3vlibrary.com',
    pSocial: 'https://twitter.com/d3v_library',
    pType: 'Standard', // Stream vs Standard
    pImageUrl: '',
    pChain: 80001,
    pYt: '',
    pm1: 0,
    pm1Desc: 'Some description',
    category: 'Web3',
    subcategory: 'Defi',
    // Step 1 is default, because step 0 is always prefilled
    stepLock: 1,
    rewMAmount: 0,
    rewDAmount: 0,
    rewId: 0,
    rewEligible: 0,
    rewObjectId: '',
    rewDonors: []
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
    throw new Error('You need to useApp inside a function');
  }

  return context;
};
