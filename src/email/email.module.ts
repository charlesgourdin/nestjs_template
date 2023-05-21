import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailService, JwtService],
  exports: [EmailService],
})
export class EmailModule {}
