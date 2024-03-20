import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TaskDto {
    @ApiProperty({
        required: true,
        example: 'Card Design Task'
    })
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
        example: 'http://github.com/card-design'
    })
    githubUrl: string;

    @ApiProperty({
        required: true,
        example: 'http://card.netlify.app/'
    })
    deployedUrl: string;
}