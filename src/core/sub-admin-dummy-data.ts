import { SubAdminContent } from "../app/components/subAdmin/sub-admin.interface";

export const SubAdmin: SubAdminContent[] = [
    {
        id: 1,
        code: "AGT001",
        name: "John Doe",
        contactNo: "9876543210",
        reference: "REF123",
        joiningDate: "2022-01-10T00:00:00Z",
        password: "johndoe123",
        passwordHash: "hashedpassword1",
        status: true,
        casinoCheck: false,
        balance: 5000,
        mc: 5,
        sc: 3,
        cc: 2,
        share: 25,
        casinoShare: 15,
        reset: false,
        limitUpdate: true,
        domainId: 100,
        adminId: 200
    },
    // Add more dummy data as needed
];
