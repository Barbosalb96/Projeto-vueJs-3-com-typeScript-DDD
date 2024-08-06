import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {UserEntity} from "@/domain/user/entities/userEntity";

export const useCounterStore = defineStore('counter', () => {
    const lastUser = ref<UserEntity[]>([]); // Tipagem do estado

    const saveLastUser = (user: UserEntity[]): void => {
        lastUser.value = user;
    };

    return {
        lastUser,
        saveLastUser,
    };
});
