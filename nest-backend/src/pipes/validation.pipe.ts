import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass, plainToClassFromExist, plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (metadata.metatype) {
            const obj = plainToInstance(metadata.metatype, value)
            const errors = await validate(obj)
            if (errors.length) {
                let messages = errors.map(err => {
                    return `${err.property} - ${err.constraints ? Object.values(err.constraints).join(', ') : ""}`
                })
                throw new ValidationException(messages)
            }
        }

        return value
    }
}