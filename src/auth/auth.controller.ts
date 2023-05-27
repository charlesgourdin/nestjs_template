import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const userId = await this.authService.signUp(createUserDto);
      return {
        status: 201,
        message: `User ${userId} created`,
      };
    } catch (error) {
      throw error;
    }
  }

  // @todo -> transform to POST when front while exist
  @Get('/confirm')
  async confirmEmail(@Query('token') token: string) {
    try {
      const email = await this.authService.decodeConfirmationToken(token);
      await this.usersService.markEmailAsConfirmed(email);

      return {
        status: 201,
        message: `Email confirmed`,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/resend-confirmation-link')
  async resendConfirmationLink(@Body('email') email: string) {
    try {
      await this.usersService.checkUserIsActive(email);
      await this.authService.sendVerificationLink(email);

      return {
        status: 200,
        message: `Confirmation link send`,
      };
    } catch (error) {
      throw error;
    }
  }
}
