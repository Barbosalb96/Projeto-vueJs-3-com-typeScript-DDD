import type {UserEntity} from '@/domain/user/entities/userEntity'
import type {UserService} from '@/domain/user/services/UserService'
import type {UnwrapRef} from "vue";

export class UserManager {
    constructor(private userService: UserService) {
    }

    async fetchUsers(searchTerm?: string): Promise<UserEntity[]> {
        return await this.userService.getUsers(typeof searchTerm === 'string' ? searchTerm : '')
    }

    async fetchUser(id: number): Promise<UserEntity> {
        return await this.userService.getUser(id)
    }

    async createUser(user: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" >>): Promise<void> {
        await this.userService.addUser(user)
    }

    async updateUser(user: {
        updated_at: any;
        name: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["name"]>;
        created_at: any;
        id: any;
        email: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["email"]>
    }): Promise<UserEntity> {
        return await this.userService.updateUser(user)
    }

    async deleteUser(id: number): Promise<void> {
        await this.userService.deleteUser(id)
    }
}
