import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy){    
   

    constructor(@InjectRepository(User) private readonly repo: Repository<User>){


        super({
            ignoreExpiration:false,
            secretOrKey:'secretKey', 
            jwtFromRequest:ExtractJwt.fromExtractors([(req:Request) => {
                return req?.cookies?.Authetication
            }])
        })
    }
    
    async validate(payload:any , request:Request){
        console.log(payload)
        
        if (!payload){
            throw new UnauthorizedException()

        }

        const user = await this.repo.findOneBy({email:payload.email})

        if (!user){
            throw new UnauthorizedException()
        }

        request.user = user;
        return request.user;
    }

    

}