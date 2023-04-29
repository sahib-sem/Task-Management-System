import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO} from './dto/create-user.dto';
import { UserLoginDTO } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly repo: Repository<User>, private jwtService:JwtService){}
  async login(loginDto:UserLoginDTO){
  

    const user = await this.repo.createQueryBuilder('user')
                  .addSelect('user.password')
                  .where('user.email = :email', {email : loginDto.email}).getOne();

    if(!user){
      throw new UnauthorizedException('wrong credential')
    }

    if (await this.validatePassword(loginDto.password , (await user).password)){
      
      
      const token = await this.jwtService.signAsync({
                    email:(await user).email,
                    id: (await user).id
                  })
      delete (await user).password;
      return {token, user}
    }
    else{
      throw new UnauthorizedException('wrong credential')
    }
  }

  async validatePassword(password:string, hash:string){
    return await bcrypt.compare(password, hash)
  }

  async registerUser(createUserDto: CreateUserDTO){

    const {email} = createUserDto;

    const checkForUser = await this.repo.findOneBy({email:email})
    if (checkForUser){
      throw new BadRequestException('user already exists')
    }
    else{
      const user = new User()
      Object.assign(user, createUserDto)
      this.repo.create(user)
      await this.repo.save(user)
      delete user.password

      return user
    }
  }


}
