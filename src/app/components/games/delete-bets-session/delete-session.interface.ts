export interface CancelBet {
    sNo: number;
    client: string;
    team: string;
    amount: number;
    rate: number;
    mode: string;
    date: string;
  }
  
  export interface CancelBetsData {
    totalPages: number;
    totalElements: number;
    size: number;
    content: CancelBet[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    empty: boolean;
  }
  
  export interface CancelBetsResponse {
    name: string;
    code: string;
    data: CancelBetsData;
  }
  