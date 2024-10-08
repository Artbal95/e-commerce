import "reflect-metadata";
import {IsString, MinLength, MaxLength, IsEmail, Matches} from "class-validator";

export class RegisterSchema {
    @IsString()
    @MinLength(1, { message: "Username must be at least 1 character long." })
    @MaxLength(50, { message: "Username cannot be longer than 50 characters." })
    username: string;

    @IsEmail({}, { message: "Email is invalid" })
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of these special characters (#?!@$%^&*-.)",
    })
    password: string;
}

export class LoginSchema {
    @IsEmail({}, { message: "Email is invalid." })
    email: string;

    @IsString()
    @MinLength(1, { message: "Password must be at least 1 character long." })
    password: string; // Password is required
}
