import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "../auth/guard/auth-guard";
import { Roles } from "src/auth/decorator/roles.decorator";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";


@ApiTags('User')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get('get-all-user')
    @Roles('admin')
    getAllUsers(){
        return this.userService.getAllUser()
    }

}