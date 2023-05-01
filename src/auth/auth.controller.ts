import { Controller, Get, Post, Body, Res, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

import { UserLoginDTO } from './dto/login-user.dto';
import {Response} from 'express';
import { CurrentUserGuard } from './current-user.guard';
import { currentUser } from './current-user.decorator';
import { User } from './entities/user.entity';


@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post('login')
  async loginUser(@Body() loginDto : UserLoginDTO , @Res() res: Response ){
    const {token, user} = await this.authService.login(loginDto)

    res.cookie('IsAuthenticated', true , {maxAge: 2 * 60 * 60 * 1000} )

    res.cookie('Authetication' , token , {
      httpOnly:true,
      maxAge:2 *60* 60 * 1000
    })

    return res.send({success: true , user})


  }

  @Post('signUp')
  async singUp(@Body() createUserDto: CreateUserDTO){

    return this.authService.registerUser(createUserDto);
  }

  @Get('authstatus')
  @UseGuards(CurrentUserGuard)
  authStatus(@currentUser() user: User){
    return {status: !!user , user:user}

  }

  @Post('logout')
  logout(@Res() res: Response){
    res.clearCookie('IsAuthenticated')
    res.clearCookie('Authetication')

    return res.status(200).send({status:true})
    
  }


}
