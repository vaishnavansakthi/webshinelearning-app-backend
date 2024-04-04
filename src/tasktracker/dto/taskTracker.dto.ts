import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LeaderboardDto {
    @ApiProperty({
        required: true,
        example: "improve code quality"
    })
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
        example: 8
    })
    storyPoints: number;

    @ApiProperty({
        required: true,
        example: "Todo"
    })
    status: string;

    @ApiProperty({
        required: true,
        example: "This is a description"
    })
    comments: string;

}