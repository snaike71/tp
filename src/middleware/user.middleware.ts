import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor (private userService: UsersService) {}
    async use(req: any, res: Response, next: NextFunction) {
        const {userId} = req.session;
        if (userId){
            const user = await this.userService.findOneById(userId)
            req.currentUser = user
        }
        next()
    }
}