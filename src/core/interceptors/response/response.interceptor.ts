import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = next.handle();
    return handler.pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        return {
          statuscode: response.statuscode,
          oData: data,
        };
      }),
    );
  }
}
