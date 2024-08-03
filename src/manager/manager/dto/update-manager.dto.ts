import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';


export class UpdateManagerDto  {

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(25, { message: 'Password must be less than 25 characters long' })
    password: string;

    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    @IsPhoneNumber(null, { message: 'Invalid phone number' })
    phoneNumber: string;
}
