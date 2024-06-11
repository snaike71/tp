import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import {
    plainToClass
} from "class-transformer";


export class SerialzeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("im an hanlder", context)

        return next.handle().pipe(
            map(

                (data: any) => {
                    console.log("Im running before", data)
                    return data
                })

        )

    }

}