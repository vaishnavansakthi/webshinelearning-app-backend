import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class AuthDto {
    
    id: string;

    @ApiProperty({
        example: 'Sakthi',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 15)
    username: string;

    @ApiProperty({
        example: 'test@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'dg473993@123D',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @Length(8, 15)  
    password: string;

    @ApiProperty({
        example: '8978967879',
        required: true
    })
    @IsNumberString()
    @Length(10, 10)
    mobileNumber: string;

}

export class LoginDto {
    @ApiProperty({
        example: 'test@gmail.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'dg473993@123D',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @Length(8, 15)  
    password: string;
}