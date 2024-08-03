import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginAuthLocalDto  {
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    password: string;

}
