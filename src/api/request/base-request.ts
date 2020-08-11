import { validate, ValidationError } from 'class-validator';

export class BaseRequest {
    public prettyLog(): string {
        return JSON.stringify(this, this.stringReplacer);
    }

    public validate(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const errors: ValidationError[] = await validate(this);
                if (errors && errors.length > 0) {

                    let stringError: any
                    errors[0].constraints ?
                        stringError = errors[0].constraints[Object.keys(errors[0].constraints)[0]] : stringError = errors[0].constraints;
                    reject(stringError);
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    private stringReplacer(key: string, value: string) {
        if (key == 'password') {
            return '******';
        } else {
            return value;
        }
    }
}
