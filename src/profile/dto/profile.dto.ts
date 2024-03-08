import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class ProfileDto {
    id: string;

    @ApiProperty({
        required: true,
        example: 'B.Sc IT'
    })
    @IsString()
    degree: string;

    @ApiProperty({
        required: true
    })
    userId: string;
    
}