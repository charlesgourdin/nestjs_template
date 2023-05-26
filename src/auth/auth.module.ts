import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
