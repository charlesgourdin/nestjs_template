import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const userId = await this.authService.signUp(createUserDto);
      return `User ${userId} created`;
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() authDto: AuthDto) {
    try {
      return await this.authService.signIn(authDto);
    } catch (error) {
      throw error;
    }
  }

  // @todo -> transform to POST when front while exist
  @HttpCode(HttpStatus.CREATED)
  @Get('/confirm')
  async confirmEmail(@Query('token') token: string) {
    try {
      const email = await this.authService.decodeSignUpToken(token);
      await this.usersService.markEmailAsConfirmed(email);

      return `Email confirmed`;
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/resend-confirmation-link')
  async resendConfirmationLink(@Body('email') email: string) {
    try {
      await this.usersService.checkUserIsActive(email);
      await this.authService.sendVerificationLink(email);

      return `Confirmation link send`;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
