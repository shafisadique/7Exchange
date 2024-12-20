export interface TeamBettingDetail {
    team: string;
    khai: number;
    lagai: number;
    plusMinus: number;
  }
  
  export interface SessionDetail {
    session: string;
    not: number;
    yes: number;
  }
  
  export interface BetDetails {
    id: number;
    rate: number;
    amount: number;
    mode: string;
    team: string;
    client: string;
    team1: string;
    team2: string;
    dateTime: string;
  }
  
  