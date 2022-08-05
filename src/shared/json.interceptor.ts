import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface JsonResponse<T> {
  status: number;
  data: T;
}

@Injectable()
export class JsonInterceptor<T> implements NestInterceptor<T, JsonResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<JsonResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const response = context.switchToHttp().getResponse();
        return {
          status: response.statusCode,
          data,
        };
      }),
    );
  }
}
