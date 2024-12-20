export interface SubAdminContent {
  id: number;
  code: string;
  name: string;
  contactNo: string;
  reference: string;
  joiningDate: string;
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

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SubAdminData {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: SubAdminContent[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export interface SubAdminResponse {
  name: string;
  code: string;
  data: SubAdminData;
}
