export interface Arrangement {
  to: Member;
  value: number;
  currency: string;
  aranged: boolean;
}

export interface Member {
  id: string;
  name: string;
  debts: Arrangement[];
}

export interface Payment {
  id: string;
  value: number;
  currency: string;
  realValue: number;
  note: string;
  fromId: string;
  date: Date;
  active: boolean;
  member: Member;
  excluded: string[];
}

export interface Room {
  roomKey: string;
  payments: Payment[];
  members: Member[];
  mainCurrency: string;
  rounding: number;
  name: string;
}
