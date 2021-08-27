type CompareValidateUpdateUser = {
    email: {
        check: boolean;
        value: any;
    };
    password: {
        check: boolean;
        value: any;
    };
    nickname: {
        check: boolean;
        value: any;
    };
};

export default CompareValidateUpdateUser;
