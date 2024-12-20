import { BetDetails, SessionDetail, TeamBettingDetail } from "../app/components/games/match-position/match-position.interface";

export const teamBettingDetails: TeamBettingDetail[] = [
    { team: "BANGLADESH WOMEN", khai: 0, lagai: 0, plusMinus: 0.00 },
    { team: "MALAYSIA WOMEN", khai: 0, lagai: 0, plusMinus: 0.00 }
  ];
  
  export const sessionDetails: SessionDetail[] = [
    { session: "10 OVER RUNS BAN W", not: 0, yes: 0 },
    { session: "LAMBI RUNS BAN W", not: 0, yes: 0 }
  ];
  
  export const betDetails: BetDetails[] = [
    
        {
          "id": 1,
          "rate": 2.5,
          "amount": 100,
          "mode": "Single",
          "team": "Team A",
          "client": "Client XYZ",
          "team1": "Team A",
          "team2": "Team B",
          "dateTime": "2024-01-01T12:00:00Z"
        },
        {
          "id": 2,
          "rate": 3.0,
          "amount": 150,
          "mode": "Multiple",
          "team": "Team B",
          "client": "Client ABC",
          "team1": "Team C",
          "team2": "Team D",
          "dateTime": "2024-01-02T15:00:00Z"
        }
  ];
  