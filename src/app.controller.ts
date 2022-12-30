import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AppService } from 'src/app.service';
import { ReportType } from 'src/data';

@Controller('reports/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type') type: ReportType,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    return this.appService.createReport(type, { source, amount });
  }

  @Patch(':id')
  updateReport(
    @Param('id') id: string,
    @Param('type') type: ReportType,
    @Body() { source, amount }: { source: string; amount: number },
  ) {
    this.appService.updateReport(type, id, { source, amount });
  }

  @Delete(':id')
  deleteReport(@Param('type') type: ReportType, @Param('id') id: string) {
    this.appService.deleteReport(type, id);
  }
}
