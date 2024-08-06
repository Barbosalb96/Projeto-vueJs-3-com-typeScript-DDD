import type {UserEntity} from '@/domain/user/entities/userEntity'
import type {UserService} from '@/domain/user/services/UserService'
import axios from 'axios'
import type {UnwrapRef} from "vue";

export class HttpUserService implements UserService {
    private apiUrl = 'http://127.0.0.1:8000/api/users'

    async getUsers(searchTerm?: string): Promise<UserEntity[]> {
        const url = searchTerm ? `${this.apiUrl}?search=${encodeURIComponent(searchTerm)}` : this.apiUrl
        const response = await axios.get<UserEntity[]>(url)
        return response.data
    }

    async getUser(id: number): Promise<UserEntity> {
        const response = await axios.get<UserEntity>(`${this.apiUrl}/${id}`)
        return response.data
    }

    async addUser(user: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at">>): Promise<void> {
        await axios.post(this.apiUrl, user)
    }

    async updateUser(user: {
        updated_at: any;
        name: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["name"]>;
        created_at: any;
        id: any;
        email: UnwrapRef<Omit<UserEntity, "id" | "created_at" | "updated_at" | "password">["email"]>
    }): Promise<UserEntity> {
        const response = await axios.put<UserEntity>(`${this.apiUrl}/${user.id}`, user)
        return response.data
    }

    async deleteUser(id: number): Promise<void> {
        await axios.delete(`${this.apiUrl}/${id}`)
    }
}
