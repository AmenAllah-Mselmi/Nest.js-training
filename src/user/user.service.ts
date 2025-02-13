import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,private readonly jwtservice :JwtService) {

  }
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save({
      name:createUserDto.name,
      email:createUserDto.email,
      password:await bcrypt.hash(createUserDto.password,10)
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
  async login(email: string, password: string,res:Response) {
    const user=await this.userRepository.findOne({where:{email:email}});
    if(!user){
      throw new BadRequestException('invalid credentials');
    }
    if(!await bcrypt.compare(password,user.password)){
      throw new BadRequestException('invalid credentials');
    }
    const jwt=await this.jwtservice.signAsync({id:user.id});
    res.cookie('jwt',jwt,{httpOnly:true,secure:true,sameSite:'none'});
    return{
      message:'success'
    }
  }
  async logout(res:Response){
    res.clearCookie('jwt');
    return{
      message:'success'}
  }
  async find(req:Request){
    try{
      const cookie=req.cookies['jwt'];
      const payload=await this.jwtservice.verifyAsync(cookie);
      if(!payload){throw new UnauthorizedException();}
      return this.userRepository.findOne({where:{id:payload.id}});
    }
    catch(e){
      throw new UnauthorizedException();
    }
  }

}
