import { useState, createContext, useContext } from 'react';

export const RewardContext = createContext({});
export const RewardProvider = (props) => {
  const [rewardState, setRewardState] = useState({
    title: '',
    desc: '',
    pledge: 0,
    cap: 0,
    tokenAddress: '',
    tokenName: '',
    tokenAmount: 0,
    nftId: 0
  });

  return (
    <RewardContext.Provider
      value={{
        rewardState,
        setRewardState,
      }}
    >
      {props.children}
    </RewardContext.Provider>
  );
};

export const useReward = () => {
  const context = useContext(RewardContext);

  if (!context) {
    throw new Error('You need to useReward inside a function');
  }

  return context;
};
