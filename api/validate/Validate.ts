import DTOClientTag from '../DTO/client/PostTag';
import validator from 'validator';
import CompareValidateUpdateUser from '../types/CompareValidateUpdateUser';

type SignInParamsReturn = {
    status: boolean;
    text?: string;
};

type handleParams = {
    id?: number;
    creator?: string;
    name?: string;
    sortOrder?: number;
};

interface Handler {
    setNext(handler: Handler): Handler;

    handle({ id, creator, name, sortOrder }: handleParams): SignInParamsReturn;
}

abstract class ValidatorTags implements Handler {
    private nextValidator: Handler;

    public setNext(validator: Handler) {
        this.nextValidator = validator;

        return this.nextValidator;
    }

    handle({ id, creator, name, sortOrder }: handleParams) {
        if (this.nextValidator) {
            return this.nextValidator.handle({ id, creator, name, sortOrder });
        }

        return {
            status: true,
        };
    }
}

class ValidateTagNameOnLength extends ValidatorTags {
    handle({ id, creator, name, sortOrder }: handleParams) {
        if (name.length > 40)
            return {
                status: false,
                text: 'Field name is too long',
            };
        if (name.length === 0) {
            return {
                status: false,
                text: 'Field name is too short',
            };
        }
        return super.handle({ id, creator, name, sortOrder });
    }
}

class ValidateTagNameOnEmpty extends ValidatorTags {
    handle({ id, creator, name, sortOrder }: handleParams) {
        if (name === undefined)
            return {
                status: false,
                text: 'Not field name',
            };
        return super.handle({ id, creator, name, sortOrder });
    }
}

const validOnActionAddNewTag = ({
    name,
    sortOrder,
}: DTOClientTag): SignInParamsReturn => {
    const onEmpty: ValidatorTags = new ValidateTagNameOnEmpty();
    onEmpty.setNext(new ValidateTagNameOnLength());

    return onEmpty.handle({
        name,
        sortOrder,
    });
};

export { validOnActionAddNewTag };
