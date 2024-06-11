import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    findOneById(id: number) {
        return this.repo.findOneBy({ id });
    }

    findOneByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneById(id);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOneById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.repo.remove(user);
    }
}

