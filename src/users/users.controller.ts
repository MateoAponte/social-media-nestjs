import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/CreateUserDto.dto';
import { PatchUserDto } from './dtos/PathUserDto.dto';
import { CheckUserDto } from './dtos/CheckUserDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ActivitiesGuard } from 'src/auth/guards/activities.guard';
import { Activities } from 'src/auth/decorators/activites.decorator';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * Inject Repository Service
     */
    private readonly usersService: UsersService,
  ) {}

  @Post('create-user')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(AuthGuard('token'), RolesGuard, ActivitiesGuard)
  @Roles('admin')
  @Activities('designer')
  @Get('get-user/:id')
  getUser(@Param('id', ParseIntPipe) id: number, @Req() request: any) {
    return this.usersService.getUserById(id);
  }

  @Post('check-user')
  checkUser(@Body() body: CheckUserDto) {
    return this.usersService.checkUser(body);
  }

  @Patch('update-user/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PatchUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
