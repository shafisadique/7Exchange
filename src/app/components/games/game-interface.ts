export interface MatchDetails {
    id: number;
    SNo: number;
    code: string;
    name: string;
    dateTime: string;
    matchType: string;
  }
  
  
  
  export interface Session {
    Session: string;
    Not: number;
    Yes: number;
  }
  
  export interface MatchPosition {
    id: string;
    Rate: string;
    Amount: number;
    Mode: string;
    Team: string;
    Client: string;
    TeamA: string;
    TeamB: string;
  }

  export interface CompleteGame {
    id:string;
    SNo: number;
    Code: number;
    Name: string;
    DateTime: string;
    MatchType: string;
    Declare: string;
    WonBy: string;
    PlusMinus: number;
}

