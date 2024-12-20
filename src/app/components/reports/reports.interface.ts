export interface Reports {
    id: number;
    master: string;
    type: string;
    oldValue: string | number | null;
    newValue: string | number | null;
    user: string;
    date: string;
    ip: string;
  }
  
  export interface AlLoginReport {
    code: string;
    name: string;
    ipAddress: string;
    dateTime: string;
    lastActivity: string;
  }
  