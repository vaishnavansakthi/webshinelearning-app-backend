import { IsBoolean, IsString, Length } from "class-validator";

export class TodoDto {
    @IsString()
    @Length(3, 20)
    item: string;

    @IsBoolean()
    completed: boolean;
}