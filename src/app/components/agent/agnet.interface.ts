export interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Content {
    id: number;
    code: string;
    name: string;
    reference: string;
    contactNo: string;
    password: string;
    passwordHash: string;
    joiningDate: string;
    status: boolean;
    shareStatus: boolean;
    casinoCheck: boolean;
    mc: number;
    sc: number;
    cc: number;
    share: number;
    casinoShare: number;
    balance: number;
    superId: number;
    mcSuper: number;
    scSuper: number;
    ccSuper: number;
    shareSuper: number;
    casinoShareSuper: number;
    masterId: number;
    subId: number;
    adminId: number;
    reset: boolean;
}

export interface Data {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Content[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface AgentDetails {
    name: string;
    code: string;
    data: Data;
}
