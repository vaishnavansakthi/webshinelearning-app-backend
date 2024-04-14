import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionDto } from './dto/session.dto';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Session')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin')
  createSession(@Body() sessionDto: SessionDto) {
    const { topic, prerequisite, sessionTiming, meetLink } = sessionDto;
    const sessionData = {
      topic,
      prerequisite,
      sessionTiming,
      meetLink,
    };
    return this.sessionService.createSession(sessionData);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  getAllSessions() {
    return this.sessionService.getAllSessions();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getSessionById(@Param('id') id: string) {
    return this.sessionService.getSessionById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  updateSession(@Param('id') id: string, @Body() sessionDto: SessionDto) {
    const { topic, prerequisite, sessionTiming, meetLink } = sessionDto;
    const sessionData = {
      topic,
      prerequisite,
      sessionTiming,
      meetLink,
    };
    return this.sessionService.updateSession(id, sessionData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  deleteSession(@Param('id') id: string) {
    return this.sessionService.deleteSession(id);
  }
}
