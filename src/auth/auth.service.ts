import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(user: { email: string; password: string }) {
    let { email, password } = user;
    let checkEmail = await this.prismaService.users.findFirst({
      where: {
        email,
        password,
      },
    });
    let checkUsername = await this.prismaService.users.findFirst({
      where: {
        username: email,
        password,
      },
    });
    let checkPhone = await this.prismaService.users.findFirst({
      where: {
        phone: email,
        password,
      },
    });
    if (!checkEmail && !checkUsername && !checkPhone) {
      return 'Invalid email or password';
    }
    return this.jwtService.signAsync(
      {
        user_id:
          checkEmail.user_id || checkUsername.user_id || checkPhone.user_id,
      },
      { expiresIn: '1d', secret: 'BI_MAT' },
    );
  }
  async register(user: {
    email: string;
    full_name: string;
    password: string;
    phone: string;
    username: string;
  }) {
    let { email, full_name, password, phone, username } = user;
    let checkEmail = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
    let checkPhone = await this.prismaService.users.findFirst({
      where: {
        phone,
      },
    });
    let checkUsername = await this.prismaService.users.findFirst({
      where: {
        username,
      },
    });
    if (checkEmail) {
      return 'Email already exists';
    }
    if (checkPhone) {
      return 'Phone already exists';
    }
    if (checkUsername) {
      return 'Username already exists';
    }
    let newUser = {
      email,
      phone,
      username,
      full_name,
      password,
    };
    let userRegister = await this.prismaService.users.create({
      data: newUser,
    });
    return userRegister;
  }
}
