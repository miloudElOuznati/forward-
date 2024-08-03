import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SecurityBcrypt {
   async HashedPassword(password: string) :Promise<string>{
       return await bcrypt.hash(password, 12);
    }
   async ComparePassword(password: string, hashedPassword: string) :Promise<boolean>{
      const isMatch: boolean = await bcrypt.compare(password,hashedPassword);

       if (!isMatch) {
        throw new UnauthorizedException()
      }

      return isMatch
    }
}
  