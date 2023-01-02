import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

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