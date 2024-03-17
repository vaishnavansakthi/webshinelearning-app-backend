import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { UserService} from "./user.service";
import { AuthGuard } from "../guard/auth-guard";
import { Roles } from "../decorator/roles.decorator";
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
    @UseGuards(AuthGuard)
    @Get(':id')
    @Roles('admin', 'mentor', 'user')
    getUsersById(@Param('id') id: string){
        return this.userService.getUserById(id)
    }

    @UseGuards(AuthGuard)
    @Delete(':userId')
    @Roles('admin')
    deleteUser(@Param('userId') userId: string){
        return this.userService.deleteUser(userId)
    }

}

