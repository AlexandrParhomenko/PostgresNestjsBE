import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface RoleCreationAttrs {
    value: string;
    description: string
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: "ADMIN", description: 'Уникальное значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: "Администратор", description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;
}
