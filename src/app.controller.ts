import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';

import { AppService } from 'src/app.service';
import { ReportType } from 'src/data';
import { CreateOptionalReportDto, CreateReportDto } from 'src/dtos/report.dto';

@Controller('reports/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: ReportType, @Param('id', ParseUUIDPipe) id: string) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() { source, amount }: CreateReportDto,
  ) {
    return this.appService.createReport(type, { source, amount });
  }

  @Patch(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() body: CreateOptionalReportDto,
  ) {
    this.appService.updateReport(type, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('type', new ParseEnumPipe(ReportType)) type: ReportType, @Param('id', ParseUUIDPipe) id: string) {
    this.appService.deleteReport(type, id);
  }
}
