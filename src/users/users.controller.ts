import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerialzeInterceptor } from 'src/interceptors/serialze.interceptor';

@Controller('users')


export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
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
}
