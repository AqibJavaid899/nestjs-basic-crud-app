export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const Data: DataTypes = {
  reports: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'Rent',
      amount: 1500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};

interface DataTypes {
  reports: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export interface PayloadReportType {
  source: string;
  amount: number;
}

export interface OptionalPayloadReportType {
  source?: string;
  amount?: number;
}
