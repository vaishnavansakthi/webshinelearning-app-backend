import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../guard/auth-guard";
import { Roles } from "src/decorator/roles.decorator";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";


@ApiTags('User')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    @Roles('admin')
    getAllUsers(){
        return this.userService.getAllUser()
    }

}