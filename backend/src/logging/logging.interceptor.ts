import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private prismaService: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async () => {
        try {
          const res = await this.prismaService.log.create({
            data: {
              request_body: JSON.stringify(request.query || request.body || {}),
              request_method: request.method,
              request_url: request.url,
              response_time_ms: Date.now() - now,
              response_HTTP_code: response.statusCode,
              created_at: new Date().toISOString(),
            },
          });

          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }),
    );
  }
}
