import { CancelBetsResponse } from "../app/components/games/delete-bets-session/delete-session.interface";

export const cancelBetsDummyData: CancelBetsResponse = {
    name: "Admin One",
    code: "dd",
    data: {
      totalPages: 1,
      totalElements: 10,
      size: 25,
      content: [
        {
          sNo: 1,
          client: "Client 1",
          team: "DESERT VIPERS",
          amount: 1000,
          rate: 1.5,
          mode: "Online",
          date: "2024-08-15 15:00:00",
        },
        {
          sNo: 2,
          client: "Client 2",
          team: "ABU DHABI KNIGHT RIDERS",
          amount: 1500,
          rate: 2.0,
          mode: "Offline",
          date: "2024-08-14 23:00:00",
        },
        {
          sNo: 3,
          client: "Client 3",
          team: "DESERT VIPERS",
          amount: 2000,
          rate: 1.8,
          mode: "Online",
          date: "2024-08-14 19:30:00",
        },
        {
          sNo: 4,
          client: "Client 4",
          team: "ABU DHABI KNIGHT RIDERS",
          amount: 500,
          rate: 1.2,
          mode: "Offline",
          date: "2024-08-14 19:30:00",
        },
        {
          sNo: 5,
          client: "Client 5",
          team: "DESERT VIPERS",
          amount: 2500,
          rate: 2.1,
          mode: "Online",
          date: "2024-08-13 17:00:00",
        },
        {
          sNo: 6,
          client: "Client 6",
          team: "ABU DHABI KNIGHT RIDERS",
          amount: 3000,
          rate: 1.9,
          mode: "Offline",
          date: "2024-08-13 20:00:00",
        },
        {
          sNo: 7,
          client: "Client 7",
          team: "DESERT VIPERS",
          amount: 3500,
          rate: 1.7,
          mode: "Online",
          date: "2024-08-12 18:30:00",
        },
        {
          sNo: 8,
          client: "Client 8",
          team: "ABU DHABI KNIGHT RIDERS",
          amount: 4000,
          rate: 2.2,
          mode: "Offline",
          date: "2024-08-12 16:00:00",
        },
        {
          sNo: 9,
          client: "Client 9",
          team: "DESERT VIPERS",
          amount: 4500,
          rate: 1.6,
          mode: "Online",
          date: "2024-08-11 14:30:00",
        },
        {
          sNo: 10,
          client: "Client 10",
          team: "ABU DHABI KNIGHT RIDERS",
          amount: 5000,
          rate: 2.3,
          mode: "Offline",
          date: "2024-08-11 12:00:00",
        },
      ],
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      first: true,
      last: true,
      numberOfElements: 10,
      pageable: {
        pageNumber: 0,
        pageSize: 25,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      empty: false,
    },
  };
  