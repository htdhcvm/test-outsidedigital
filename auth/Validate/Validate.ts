import validator from 'validator';
import isNumber from '../Helpers/isNumber';
import ClientDTOSignIn from '../DTO/client/SignIn';

type SignInParamsReturn = {
    status: boolean;
    text?: string;
};

interface Handler {
    setNext(handler: Handler): Handler;

    handle(
        email: string,
        password: string,
        nickname: string
    ): SignInParamsReturn;
}

abstract class Validator implements Handler {
    private nextValidator: Handler;

    public setNext(validator: Handler) {
        this.nextValidator = validator;

        return this.nextValidator;
    }

    handle(email: string, password: string, nickname: string) {
        if (this.nextValidator) {
            return this.nextValidator.handle(email, password, nickname);
        }

        return {
            status: true,
        };
    }
}

class ValidateNickEmailPasswordOnUndefined extends Validator {
    handle(email: string, password: string, nickname: string) {
        let errorStringEmpty = 'The following fields are missing: ';
        let checkerOnError = false;

        const undefinedChecker = {
            nickname: false,
            email: false,
            password: false,
        };

        if (nickname === undefined) undefinedChecker.nickname = true;
        if (email === undefined) undefinedChecker.email = true;
        if (password === undefined) undefinedChecker.password = true;

        for (const [key, val] of Object.entries(undefinedChecker)) {
            if (val) {
                errorStringEmpty += key + ' ';
                checkerOnError = true;
            }
        }

        if (checkerOnError) {
            return {
                status: !checkerOnError,
                text: errorStringEmpty.trim(),
            };
        }

        return super.handle(email, password, nickname);
    }
}
class ValidateNickEmailPasswordOnEmpty extends Validator {
    handle(email: string, password: string, nickname: string) {
        let errorStringEmpty = 'The following fields are empty: ';
        let checkerOnError = false;

        let emptyChecker = {
            nickname: false,
            email: false,
            password: false,
        };

        if (validator.isEmpty(nickname)) emptyChecker.nickname = true;
        if (validator.isEmpty(email)) emptyChecker.email = true;
        if (validator.isEmpty(password)) emptyChecker.password = true;

        for (const [key, val] of Object.entries(emptyChecker)) {
            if (val) {
                errorStringEmpty += key + ' ';
                checkerOnError = true;
            }
        }

        if (checkerOnError) {
            return {
                status: !checkerOnError,
                text: errorStringEmpty.trim(),
            };
        }

        return super.handle(email, password, nickname);
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

const isValidSignIn = ({
    email,
    password,
    nickname,
}: ClientDTOSignIn): SignInParamsReturn => {
    const onUndefined: Validator = new ValidateNickEmailPasswordOnUndefined();

    onUndefined
        .setNext(new ValidateNickEmailPasswordOnEmpty())
        .setNext(new ValidateEmailOnValid())
        .setNext(new ValidatePasswordOnLength())
        .setNext(new ValidatePasswordOnUppercase())
        .setNext(new ValidatePasswordOnNumbers())
        .setNext(new ValidatePasswordOnLowercase());

    return onUndefined.handle(email, password, nickname);
};

export { isValidSignIn };
