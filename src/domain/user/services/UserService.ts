import type {UserEntity} from '../entities/userEntity'
import type {UnwrapRef} from "vue";

export interface UserService {
    getUsers(searchTerm: string): Promise<UserEntity[]>

    getUser(id: number): Promise<UserEntity>

    addUser(user: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at">>): Promise<void>

    updateUser(user: {
        updated_at: any;
        name: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["name"]>;
        created_at: any;
        id: any;
        email: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["email"]>
    }): Promise<UserEntity>

    deleteUser(id: number): Promise<void>
}
