import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isBlank', async: false })
export class IsNotBlank implements ValidatorConstraintInterface {

    validate(value: string) {
        return typeof value === "string" && value.trim().length > 0;
    }

    defaultMessage(validationArguments: ValidationArguments) { 
        // here you can provide default error message if validation failed
        return `${validationArguments.property} should not be blank`;
    }
}
