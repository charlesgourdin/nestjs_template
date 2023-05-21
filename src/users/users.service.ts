import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import EmailService from 'src/email/email.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const { id } = await this.usersRepository.save(user);

      await this.emailService.sendVerificationLink('gourdin.charles@gmail.com');

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
          isActive: false,
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

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
