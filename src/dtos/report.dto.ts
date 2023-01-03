import { Exclude } from 'class-transformer';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { ReportType } from 'src/data';

export class CreateReportDto {

    @IsString()
    @IsNotEmpty()
    source: string;

    @IsNumber()
    @IsPositive()
    amount: number
}

export class CreateOptionalReportDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    source: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    amount: number
}

export class ReportResponseDto {
    id: string
    source: string
    amount: number
    type: ReportType

    @Expose({ name: 'createdAt' })
    transformCreatedAt() {
        return this.created_at
    }

    @Exclude()
    updated_at: Date

    @Exclude()
    created_at: Date

    constructor(response: Partial<ReportResponseDto>) {
        Object.assign(this, response)
    }
}