import { BetDetail, TeamScore } from "../app/components/games/view-match-report/view-interface";

export const TEAM_SCORES: TeamScore[] = [
    { teamName: 'England', score: 10 },
    { teamName: 'NewZealand', score: 40 }
  ];
export const BET_DETAILS: BetDetail[] = [
    {
      id: 1,
      client: 'a',
      rate: 2.5,
      team: 'England',
      mode: 'Normal',
      amount: 100,
      dateTime: '2024-07-25T12:00:00Z'
    },
    {
      id: 2,
      client: 'b',
      rate: 3.0,
      team: 'NewZealand',
      mode: 'Urgent',
      amount: 200,
      dateTime: '2024-07-26T12:00:00Z'
    }
  ];