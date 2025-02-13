import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
  @Post('login')
  async login(@Body() @Body() email:string,@Body() password:string,@Res({passthrough:true}) res:Response){ 
    return this.userService.login(email,password,res);
  }
  @Post('logout')
  async logout(@Res({passthrough:true}) res:Response){ 
    return this.userService.logout(res);
  }
}
