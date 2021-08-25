const isNumber = (item: string | number) => {
    if (!Number.isNaN(+item)) {
        return true;
    }
    return false;
};

export default isNumber;
