type SignInReturn = {
    status: boolean;
    statusCode: number;
    text?: string;
    tokenData?: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
};

export default SignInReturn;
