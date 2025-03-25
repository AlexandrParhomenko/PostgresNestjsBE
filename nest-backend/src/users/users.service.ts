import {Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userStorage: typeof User) {}
    async createUser(dto: CreateUserDto) {
        return await this.userStorage.create(dto)
    }

    async getAllUsers() {
        return await this.userStorage.findAll()
    }
}
