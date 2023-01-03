import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import {
  Data,
  OptionalPayloadReportType,
  PayloadReportType,
  ReportType,
} from 'src/data';
import { ReportResponseDto } from './dtos/report.dto';

@Injectable()
export class AppService {
  
  getAllReports(type: ReportType) : ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return Data.reports.filter((report) => report.type === reportType).map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string) : ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const report = Data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    return new ReportResponseDto(report);
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
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    requestPayload: OptionalPayloadReportType,
  ) :ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = Data.reports
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);

    const reportIndex = Data.reports.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    
    Data.reports[reportIndex] = {
      ...Data.reports[reportIndex],
      ...requestPayload,
    };

    return new ReportResponseDto(Data?.reports[reportIndex]);
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
