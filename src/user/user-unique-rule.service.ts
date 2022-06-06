import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { MikroORM } from '@mikro-orm/core';

@ValidatorConstraint({ name: 'UserExist', async: true })
@Injectable()
export class UserUniqueRule implements ValidatorConstraintInterface {
  constructor(
    protected readonly orm: MikroORM) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `User already exists`;
  }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    try {
      const property = validationArguments.property;
      const [EntityClass, findCondition = property] = validationArguments.constraints;
      // const { property } = validationArguments;
      console.log('validate: ', validationArguments);
      const result = await this.orm.em.count(EntityClass,
        typeof findCondition === 'function'
          ? findCondition(validationArguments)
          : { [findCondition || property]: value },
        );
      console.log('result: ', result);
      return result <= 0;
      // return await this.repository.count({ [property]: value }) <= 0;
    } catch (e) {
      console.log(e);
      return true;
    }
  }

}
