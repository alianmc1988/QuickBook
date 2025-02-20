import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Query,
  Delete,
  Patch,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  find() {
    return this.userService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @Post('/restore')
  restore(@Query('id') id: UUID) {
    return this.userService.restore(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
