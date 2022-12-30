import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import {
  Data,
  OptionalPayloadReportType,
  PayloadReportType,
  ReportType,
} from 'src/data';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return Data.reports.filter((report) => report.type === reportType);
  }

  getReportById(type: ReportType, id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const report = Data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    return report;
  }

  createReport(type: ReportType, { source, amount }: PayloadReportType) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };

    Data.reports.push(newReport);
    return newReport;
  }

  updateReport(
    type: ReportType,
    id: string,
    requestPayload: OptionalPayloadReportType,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = Data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    if (!reportToUpdate.id)
      return { message: 'Report with given Id is not found' };

    const reportIndex = Data.reports.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    Data.reports[reportIndex] = {
      ...Data.reports[reportIndex],
      ...requestPayload,
    };

    return Data?.reports[reportIndex];
  }

  deleteReport(type: ReportType, id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToDelete = Data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    const reportIndex = Data.reports.findIndex(
      (report) => report.id === reportToDelete.id,
    );

    Data.reports.splice(reportIndex, 1);

    return { message: 'Successfully deleted the Report.' };
  }
}
