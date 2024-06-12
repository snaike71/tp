import { Body, Controller, Delete, Get, Param, Post, Put, Query, Session, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerialzeInterceptor } from 'src/interceptors/serialze.interceptor';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')


export class UsersController {


    constructor(
        private usersService: UsersService,
        private authService: AuthService
        ) {}

        @Post('signup')
    @UseInterceptors(SerialzeInterceptor)
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;  // Persist user ID in session
        return user;
    }

    @Post('signin')
    @UseInterceptors(SerialzeInterceptor)
    async signin(@Body() body: LoginUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;  // Persist user ID in session
        return user;
    }


    @Get(':id')
    @UseInterceptors(SerialzeInterceptor)
    getUserById(@Param('id') id: number) {
        return this.usersService.findOneById(id);
    }

    @Get()
    getUserByEmail(@Query('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @Put(':id')
    updateUserById(@Param('id') id: number, @Body() body: Partial<UpdateUserDto>) {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    deleteUserById(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
    @Get('session')
    getSession(@Session() session: any) {
        return session.userId ? { userId: session.userId } : { message: 'No user logged in' };
    }
}
