import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    firstname:string;
    @IsNotEmpty()
    @IsString()
    lastname:string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsOptional()
    @IsString()
    profilepic:string;
}
