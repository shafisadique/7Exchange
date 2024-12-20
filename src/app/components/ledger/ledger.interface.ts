export interface Ledger{
  date: string; // Assuming the date is in string format
  collection: string;
  debit: number;
    credit: number;
    balance: number;
    paymentType:string;
    type: string;
    remark: string;
}

export interface ClientPlusMinus {
    id: number;
    name: string;
  }
  
  export interface ClientLedger {
    name: string;
    contact: string;
    op: number;
    curr: number;
    cls: number;
  }
  export interface AgentLedger {
    name: string;
    contact: string;
    op: number;
    curr: number;
    cls: number;
  }
  export interface SuperLedger {
    name: string;
    contact: string;
    op: number;
    curr: number;
    cls: number;
  }
  export interface MasterLedger {
    name: string;
    contact: string;
    op: number;
    curr: number;
    cls: number;
  }
  