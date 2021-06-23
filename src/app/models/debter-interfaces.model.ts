export interface AddPaymentRequest {
    value: number;
    currency: string;
    note: string;
    memberId: string;
    included: string[];
}

export interface CreateRoomResponse {
    roomKey: string;
    name: string;
    rounding: number;
    currency: string;
}

export interface GetDebtsResponse {
    currency: string;
    debts: {
        id: string,
        name: string,
        debts: {
            payeeId: string,
            payeeName: string,
            value: number,
            arranged: boolean
        }[]
    }[];
}

export interface GetPaymentsResponse {
    activePayments: {
        id: string,
        memberName: string,
        value: number,
        currency: string,
        note: string,
        date: Date,
        includedMembers: {
            memberName: string,
            included: boolean
        }[]
    }[];
}

export interface RoomSummary {
    roomKey: string;
    name: string;
    sum: number;
    currency: string;
    memberSummary: {
        name: string,
        sum: number,
        debt: number
    }[];
}
