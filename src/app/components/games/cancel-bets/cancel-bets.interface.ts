export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface Match {
    sNo: number;
    code: number;
    name: string;
    dateTime: string;
    matchType: string;
    declare: string;
    wonBy: string;
    plusMinus: number;
  }
  
  export interface Data {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Match[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: Pageable;
    empty: boolean;
  }
  
  export interface CancelBets {
    name: string;
    code: string;
    data: Data;
  }
  