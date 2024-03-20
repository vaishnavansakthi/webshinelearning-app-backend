import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LeaderboardDto {
    @ApiProperty({
        required: true,
        example: "improve code quality"
    })
    @IsString()
    suggestion: string;

    @ApiProperty({
        required: true,
        example: 50
    })
    points: number;

  
}