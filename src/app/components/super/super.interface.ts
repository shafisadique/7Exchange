// super.interface.ts
export interface SuperData {
  id: string;
  code: string;
  name: string;
  reference: string;
  password: string;
  contactNo: string;
  currentLimit: number;
  share: number;
  mc: number;
  sc: number;
  cc: number;
  status: boolean;
}

export interface ApiResponse {
  name: string;
  code: string;
  data: {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: SuperData[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
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
  };
}


export interface Master {
    id: number;
    code: string;
    name: string;
    contactNo: string;
    reference: string;
    joiningDate: string; // Use Date type if you plan to convert to Date objects in your code
    password: string;
    passwordHash: string;
    status: boolean;
    casinoCheck: boolean;
    balance: number;
    mc: number;
    sc: number;
    cc: number;
    share: number;
    casinoShare: number;
    reset: boolean;
    limitUpdate: boolean;
    domainId: number;
    adminId: number;
  }
