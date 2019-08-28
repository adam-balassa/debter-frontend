export interface Arrangement {
  from: Member;
  to: Member;
  value: number;
  currency: string;
  arranged: boolean;
}

export interface Member {
  id: string;
  name: string;
  debts: Arrangement[];
  sum: number;
  debt: number;
}

export interface Payment {
  id: string;
  value: number;
  currency: string;
  realValue: number;
  note: string;
  date: Date;
  active: boolean;
  member: Member;
  excluded: Member[];
}

export interface Room {
  roomKey: string;
  payments: Payment[];
  members: Member[];
  mainCurrency: string;
  rounding: number;
  name: string;
}
