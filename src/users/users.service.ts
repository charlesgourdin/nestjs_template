import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.create(createUserDto);
      const createdUser = await this.usersRepository.save(user);

      return createdUser;
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

  async checkUserIsActive(email: string): Promise<boolean> {
    try {
      const { isActive } = await this.usersRepository.findOneBy({ email });
      if (isActive) {
        throw new BadRequestException('User account already validated');
      }
      return isActive;
    } catch (error) {
      throw new NotFoundException('User does not exist');
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
