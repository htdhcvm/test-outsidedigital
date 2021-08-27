import { Request, Response, NextFunction } from 'express';
import ParamsCheck from '../types/ParamsCheck';

const checkParamsSortTeg = (
    req: Request & { check: ParamsCheck },
    res: Response,
    next: NextFunction
) => {
    const { sortByOrder, sortByName, offset, length } = req.query;

    const paramsCheck: ParamsCheck = {
        sortByOrder: false,
        sortByName: false,
        offset: 0,
        length: 0,
    };

    if (offset !== undefined) paramsCheck.offset = +offset;
    if (length !== undefined) paramsCheck.length = +length;
    if (sortByOrder !== undefined) paramsCheck.sortByOrder = true;
    if (sortByName !== undefined) paramsCheck.sortByName = true;

    req.check = paramsCheck;

    if (paramsCheck.offset === 0 && paramsCheck.length === 0)
        return res.send({
            data: [],
            meta: {
                offset: 0,
                length: 0,
                quantity: 0,
            },
        });
    next();
};
export default checkParamsSortTeg;
