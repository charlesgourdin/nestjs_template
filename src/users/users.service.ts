import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
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
      const { password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const { id } = await this.usersRepository.save(user);
      return id;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      const data = this.usersRepository.find();
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
