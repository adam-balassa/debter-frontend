export interface Split {
  memberId: string;
  units: number;
}

export interface AddPaymentRequest {
  value: number;
  currency: string;
  note: string;
  memberId: string;
  split: Split[];
}

export interface CreateRoomResponse {
  roomKey: string;
  name: string;
  rounding: number;
  currency: string;
}

export interface GetDebtsResponse {
  currency: string;
  debts: GetDebtMemberResponse[];
}

export interface GetDebtMemberResponse {
  id: string;
  name: string;
  debt: number;
  sum: number;
  debts: GetDebtResponse[];
}

export interface GetDebtResponse {
  payeeId: string;
  payeeName: string;
  value: number;
  arranged: boolean;
}

export interface GetPaymentsResponse {
  activePayments: GetPaymentResponse[];
  deletedPayments: GetPaymentResponse[];
}

export interface GetPaymentResponse {
  id: string;
  memberName: string;
  value: number;
  convertedValue: number;
  currency: string;
  note: string;
  date: Date;
  split: {
    memberName: string;
    share: number;
  }[];
}

export interface RoomSummary {
  roomKey: string;
  name: string;
  sum: number;
  currency: string;
  memberSummary: {
    name: string;
    sum: number;
    debt: number;
  }[];
}

export interface AddMemberRequest {
  name: string,
  includedPaymentIds: string[];
}
