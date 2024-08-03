import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SecrityCoockies {
    async CreateCookie(name: string, value: string, res: Response) {
        const cookieOptions = { maxAge: 86400, httpOnly: true, secure: false };
        return  res.cookie(name, value, cookieOptions);
    }

    async ClearCookie( name: string, res: Response) {
        res.clearCookie(name);
        console.log(`Cookie cleared: ${name}`);
    }
}
