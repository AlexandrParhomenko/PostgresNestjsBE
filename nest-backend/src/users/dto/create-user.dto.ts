import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "user@mail.ru", description: 'Почтовый адрес'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;
    @ApiProperty({example: "123456", description: 'Пароль'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(4, 16, {message: 'Длина не меньше 4 и не больше 16 символов'})
    readonly password: string;
}