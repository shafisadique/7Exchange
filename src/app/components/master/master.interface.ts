// src/app/models/master.interfaces.ts

// Interface for individual master record content
export interface MasterContent {
  id: number;
  code: string;
  name: string;
  reference: string;
  contactNo: string;
  password: string;
  passwordHash: string;
  joiningDate: string;
  status: boolean;
  casinoCheck: boolean;
  icCheck: boolean;
  mc: number;
  sc: number;
  cc: number;
  share: number;
  icShare: number;
  currentLimit: number;
  subId: number;
  mcSub: number;
  scSub: number;
  ccSub: number;
  shareSub: number;
  icShareSub: number;
  adminId: number;
  reset: boolean;
  cshare: number;
  cshareSub: number;
}

// Interface for sorting information
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// Interface for pageable information
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// Interface for master data, containing pagination and content information
export interface MasterData {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: MasterContent[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

// Interface for the master response, containing the name, code, and data
export interface MasterResponse {
  name: string;
  code: string;
  data: MasterData;
}

export interface SubAdminMaster {
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
