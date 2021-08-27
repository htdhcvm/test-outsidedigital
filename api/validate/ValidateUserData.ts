import CompareValidateUpdateUser from '../types/CompareValidateUpdateUser';
import isNumber from '../helpers/isNumber';
import validator from 'validator';

type SignInParamsReturn = {
    status: boolean;
    text?: string;
};

interface Handler {
    setNext(handler: Handler): Handler;

    handle(
        email: string,
        password: string,
        nickname?: string
    ): SignInParamsReturn;
}

abstract class Validator implements Handler {
    private nextValidator: Handler;

    public setNext(validator: Handler) {
        this.nextValidator = validator;

        return this.nextValidator;
    }

    handle(email: string, password: string, nickname?: string) {
        if (this.nextValidator) {
            return this.nextValidator.handle(email, password, nickname);
        }

        return {
            status: true,
        };
    }
}

class ValidateEmailOnValid extends Validator {
    handle(email: string, password: string, nickname: string) {
        if (!validator.isEmail(email)) {
            return {
                status: false,
                text: 'field email not valid',
            };
        }
        return super.handle(email, password, nickname);
    }
}
class ValidatePasswordOnLength extends Validator {
    handle(email: string, password: string, nickname: string) {
        if (password.length < 8) {
            return {
                status: false,
                text: 'field password length less than eight characters',
            };
        }
        return super.handle(email, password, nickname);
    }
}
class ValidatePasswordOnUppercase extends Validator {
    handle(email: string, password: string, nickname: string) {
        let markCheckOnCharacterUppercase = false;

        for (let i = 0; i < password.length; i++) {
            if (!isNumber(password[i])) {
                if (password[i] === password[i].toUpperCase()) {
                    markCheckOnCharacterUppercase = true;
                    break;
                }
            }
        }

        if (!markCheckOnCharacterUppercase) {
            return {
                status: false,
                text: 'the password field must contain at least one upper letter',
            };
        }
        return super.handle(email, password, nickname);
    }
}
class ValidatePasswordOnNumbers extends Validator {
    handle(email: string, password: string, nickname: string) {
        let markCheckOnNumbers: boolean = false;

        for (let i = 0; i < password.length; i++) {
            if (isNumber(password[i])) {
                markCheckOnNumbers = true;
                break;
            }
        }

        if (!markCheckOnNumbers) {
            return {
                status: false,
                text: 'the password field must contain at least one digit',
            };
        }

        return super.handle(email, password, nickname);
    }
}
class ValidatePasswordOnLowercase extends Validator {
    handle(email: string, password: string, nickname: string) {
        let markCheckOnCharacterLowercase = false;

        for (let i = 0; i < password.length; i++) {
            if (!isNumber(password[i])) {
                if (password[i] === password[i].toLowerCase()) {
                    markCheckOnCharacterLowercase = true;
                    break;
                }
            }
        }

        if (!markCheckOnCharacterLowercase) {
            return {
                status: false,
                text: 'the password field must contain at least one lower letter',
            };
        }

        return super.handle(email, password, nickname);
    }
}

class ValidateNickName extends Validator {
    handle(email: string, password: string, nickname: string) {
        if (nickname.length === 0) {
            return {
                status: false,
                text: 'nickname empty',
            };
        }

        return super.handle(email, password, nickname);
    }
}

const isValidData = (validateData: CompareValidateUpdateUser) => {
    const data = {
        email: validateData.email.check ? validateData.email.value : '',
        password: validateData.password.check
            ? validateData.password.value
            : '',
        nickname: validateData.nickname.check
            ? validateData.nickname.value
            : '',
    };

    let onCheck: Validator;

    const arrayToCheck: Validator[] = [];

    if (validateData.email.check) {
        arrayToCheck.push(new ValidateEmailOnValid());
    }
    if (validateData.nickname.check) {
        arrayToCheck.push(new ValidateNickName());
    }
    if (validateData.password.check) {
        arrayToCheck.push(
            new ValidatePasswordOnLength(),
            new ValidatePasswordOnUppercase(),
            new ValidatePasswordOnNumbers(),
            new ValidatePasswordOnLowercase()
        );
    }

    onCheck = arrayToCheck.shift();

    let tmp: Handler;

    arrayToCheck.forEach((item, index) => {
        if (index === 0) {
            tmp = onCheck.setNext(item);
        } else {
            tmp = tmp.setNext(item);
        }
    });

    return onCheck.handle(data.email, data.password, data.nickname);
};

export default isValidData;
