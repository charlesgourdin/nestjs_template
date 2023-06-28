import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('/user:id')
  async findOneById(@Param('id') id: string) {
    try {
      const result = await this.usersService.findOneById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('/user')
  async findOneByEmail(@Query('email') email: string) {
    try {
      const result = await this.usersService.findOneByEmail(email);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
