import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const { id, email } = await this.usersRepository.save(user);

      await this.authService.sendVerificationLink(email);

      return id;
    } catch (error) {
      throw error;
    }
  }

  async markEmailAsConfirmed(email: string): Promise<UpdateResult> {
    try {
      return this.usersRepository.update(
        {
          email,
        },
        {
          isActive: true,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await this.usersRepository.find();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
