import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class AttendanceDto {
    @ApiProperty({
        required: true,
        example: 'Functional Programming'
    })
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
        example: 'Present'
    })
    @IsString()
    status: string;

    @ApiProperty({
        example: 'This is a description'
    })
    @IsString()
    desc: string;

    @ApiProperty({
        example: '2020-01-01'
    })
    @IsDateString()
    @IsOptional()
    date: string;
}