export interface Reward {
    title: string;
    description: string;
    eligibleActual: number;
    cap: number;
    active: boolean;
    type: string;
    project: string;
    tokenName: string;
    tokenAddress: string;
    tokenAmount: number;
    requiredPledge: number;
    nftId: number;
    rType: number;
    rewardId: number;
    donors: object;
    owner: string;
    updatedAt: string;
    createdAt: string;
  }
  