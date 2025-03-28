import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userStorage: typeof User,
                private roleService: RolesService) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.userStorage.create(dto)
        const role = await this.roleService.getRoleByValue("ADMIN")
        if (role) {
            await user.$set('roles', [role.id])
            user.roles = [role]
        }
        return user
    }

    async getAllUsers() {
        return await this.userStorage.findAll({include: {all: true}})
    }

    async getUserByEmail(email: string) {
        return await this.userStorage.findOne({where: {email}, include: {all: true}})
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userStorage.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userStorage.findByPk(dto.userId);
        if (user) {
            user.banned = true
            user.banReason = dto.banReason
            await user.save()
            return user
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
}
