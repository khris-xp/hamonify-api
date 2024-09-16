import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  compareBcrypt,
  hashBcrypt,
  hashSha256,
  verifySha256,
} from 'src/shared/utils';

import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from './dtos';
import { UserDocument } from './schemas';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<UserDocument> {
    const hashedRefreshToken = hashSha256(refreshToken);

    return this.usersRepository.findByIdAndUpdate(
      userId,
      { refreshToken: hashedRefreshToken },
      { new: false },
    );
  }

  async getUserById(userId: string): Promise<UserDocument | null> {
    return this.usersRepository.findById(userId);
  }

  async getUserProfileById(id: string): Promise<UserDocument> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Not found this user id');
    }

    return user;
  }

  async resetRefreshToken(userId: string): Promise<UserDocument> {
    return this.usersRepository.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: false },
    );
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<UserDocument> {
    const user = await this.getUserById(userId);

    if (!user) {
      return null;
    }

    if (!user?.refreshToken) {
      throw new UnauthorizedException(
        'user is already login out. please login again to do the action',
      );
    }

    const isRefreshTokenMatching = verifySha256(
      refreshToken,
      user?.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await hashBcrypt(createUserDto.password);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.usersRepository.findOne({ email });
  }

  async findUserByUsername(username: string): Promise<UserDocument> {
    return this.usersRepository.findOne({ username });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.usersRepository.findByIdAndUpdate(id, updateUserDto);
  }

  async changePassword(
    id: string,
    password: ChangePasswordDto,
  ): Promise<UserDocument> {
    const user = await this.usersRepository.findById(id);
    const isPasswordMatching = await compareBcrypt(
      password.oldPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Password not correct!');
    }

    const hashedPassword = await hashBcrypt(password.newPassword);

    return this.usersRepository.findByIdAndUpdate(id, {
      $set: { password: hashedPassword },
    });
  }
}
