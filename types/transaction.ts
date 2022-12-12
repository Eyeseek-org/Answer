export interface Transaction {
    amount: number;
    backer: string;
    chain: number;
    currency_id: number;
    date: string;
    drained: number;
    fund_id: number;
    txn_hash: string;
  }