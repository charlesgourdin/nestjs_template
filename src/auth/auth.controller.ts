import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // @todo -> transform to POST when front while exist
  @Get('/confirm')
  async confirmEmail(@Query('token') token: string) {
    try {
      const email = await this.authService.decodeConfirmationToken(token);
      await this.userService.markEmailAsConfirmed(email);

      return {
        status: 201,
        message: `Email confirmed`,
      };
    } catch (error) {
      throw error;
    }
  }
}
