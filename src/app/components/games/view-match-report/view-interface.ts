export interface TeamScore {
    teamName: string;
    score: number;
  }
  
  export interface BetDetail {
    id: number;
    client: string;
    rate: number;
    team: string;
    mode: string;
    amount: number;
    dateTime: string;
  }