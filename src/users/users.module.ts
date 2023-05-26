import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
})
export class UsersModule {}
