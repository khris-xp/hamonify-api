import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser, ObjectId } from '../../common/decorators';
import { JwtAccessGuard } from '../../common/guards';

import { UpdateUserDto, UserResponse } from './dtos';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UserDocument } from './schemas';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: 'Get user profile',
  })
  @ApiOkResponse({
    description: 'Get user profile successfully',
    type: UserResponse,
  })
  getProfile(@CurrentUser('_id') id: string): Promise<UserDocument> {
    return this.usersService.getUserProfileById(id);
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Change user profile',
  })
  @ApiOkResponse({
    description: 'Change user profile successfully',
    type: UserResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  updateProfile(
    @CurrentUser('_id') userId: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, userDto);
  }

  @Patch('password')
  @ApiOperation({
    summary: 'Change user password',
  })
  @ApiOkResponse({
    description: 'Change user password',
    type: UserResponse,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  changePassword(
    @CurrentUser('_id') userId: string,
    @Body() password: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, password);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user from id',
  })
  @ApiOkResponse({
    description: 'Get user from id successfully',
    type: UserResponse,
  })
  @ApiParam({ name: 'id', type: String })
  getUserById(@ObjectId('id') id: string): Promise<UserDocument> {
    return this.usersService.getUserProfileById(id);
  }
}
