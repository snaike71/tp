import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service'; // Import AuthService
import { CurrentUserInterceptor } from 'src/interceptors/curent.interceptor';
import { CurrentUserMiddleware } from 'src/middleware/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,CurrentUserInterceptor], // Ajoutez AuthService dans les providers
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
