<template>
  <div class="">

    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>
      <div class="card-body p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="stat-card bg-blue-500 text-white p-4 rounded-lg">
            <h6>Total de Usuários</h6>
            <p class="stat-value text-2xl">{{ users.length }}</p>
          </div>
          <div class="stat-card bg-green-500 text-white p-4 rounded-lg">
            <h6>Usuário Mais Recente</h6>
            <p class="stat-value text-2xl">{{ recentUser?.name || 'N/A' }}</p>
          </div>
          <div class="stat-card bg-yellow-500 text-white p-4 rounded-lg">
            <h6>Data Mais Recente</h6>
            <p class="stat-value text-2xl">{{ recentDate || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <div class="p-6">
        <input
            type="text"
            class="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Buscar por ID, Nome ou Email"
            v-model="searchTerm"
        />

      </div>


      <button type="button" class="btn bg-blue-500 text-white mx-6  p-2 rounded-md mb-3" @click="toggleModal('create')">
        Cadastrar
      </button>
    </header>
    <Alert :params="message"/>
    <main class="bg-white shadow my-5">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 p-4">Usuarios Cadastrados</h1>
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-neutral-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Criado Em</th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Atualizado Em
                  </th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{{ user.id }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ user.name }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ user.email }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                    {{ new Date(user.created_at).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                    {{ new Date(user.updated_at).toLocaleDateString() }}
                  </td>
                  <td class="px-6 text-center py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button"
                            @click="toggleModal('update', user)"

                            class="py-3 px-4 mx-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">
                      Editar
                    </button>
                    <button type="button"
                            @click="deleteUser(user.id)"
                            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-bg-red-800-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800-800/20">
                      Delete
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div
        class="modal fixed inset-0 flex items-center justify-center"
        :class="{ 'opacity-100 pointer-events-auto': showModal, 'opacity-0 pointer-events-none': !showModal }"
        role="dialog"
        aria-labelledby="userModalLabel"
        aria-hidden="true"
    >
      <div class="modal-dialog bg-white rounded-lg shadow p-6 max-w-md w-full">
        <div class="modal-content">
          <div class="modal-header flex justify-between items-center pb-4 border-b border-gray-200">
            <h5 class="modal-title text-xl font-semibold">
              {{ modalType === 'create' ? 'Cadastrar Usuário' : 'Editar Usuário' }}
            </h5>
            <button type="button" class="text-gray-500 hover:text-gray-700" @click="toggleModal(null)"
                    aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-4">
            <div v-if="isLoading" class="flex justify-center">
              <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span class="sr-only">Carregando...</span>
              </div>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="form-group mb-4">
                <label for="name" class="block text-gray-700 font-medium">Nome</label>
                <input type="text"
                       class="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                       id="name" v-model="form.name" required/>
              </div>
              <div class="form-group mb-4">
                <label for="email" class="block text-gray-700 font-medium">Email</label>
                <input type="email"
                       class="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                       id="email" v-model="form.email" required/>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="block text-gray-700 font-medium">Password</label>
                <input type="password"
                       class="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                       id="password" v-model="form.password" required/>
              </div>
              <button type="submit" class="btn bg-blue-500 text-white px-4 py-2 rounded-md">
                {{ modalType === 'create' ? 'Salvar' : 'Atualizar' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import {UserManager} from '../application/UserManager'
import {HttpUserService} from '../infrastructure/services/HttpUserService'
import type {UserEntity} from '../domain/user/entities/userEntity'
import {useCounterStore} from "@/stores/useCounterStore";
import Alert from "@/components/alert.vue";

const userService = new HttpUserService()
const userManager = new UserManager(userService)
const UserCounterStore = useCounterStore();

const users = ref<UserEntity[]>([])
const showModal = ref(false)
const modalType = ref<'create' | 'update' | null>(null)
const form = ref<Omit<UserEntity, 'id' | 'created_at' | 'updated_at' | 'password'>>({
  name: '',
  email: '',
  password: ''
})

const message = ref<string>('')

const currentUser = ref<UserEntity | null>(null)
const isLoading = ref(false)

const recentUser = computed(() =>
    users.value.reduce(
        (latest, user) =>
            !latest || new Date(user.created_at) > new Date(latest.created_at) ? user : latest,
        null as UserEntity | null
    )
)

const searchTerm = ref<string>('')
const password = ref(null)
watch(searchTerm, async (newTerm) => {
  users.value = await userManager.fetchUsers(newTerm)
})
const recentDate = computed(() =>
    recentUser.value ? new Date(recentUser.value.created_at).toLocaleDateString() : ''
)

onMounted(async () => {
  users.value = await userManager.fetchUsers()
})

function toggleModal(type: 'create' | 'update' | null, user?: UserEntity) {
  showModal.value = type !== null
  modalType.value = type
  if (type === 'update' && user) {
    currentUser.value = user
    form.value = {
      name: user.name,
      email: user.email,
      password: user.password
    }
  } else {
    form.value = {
      name: '',
      email: '',
      password: ''
    }
  }
}

// Função para tratar o envio do formulário
async function handleSubmit() {
  isLoading.value = true
  if (modalType.value === 'create') {
    await userManager.createUser(form.value)
    message.value = 'Registro criado com sucesso'
  } else if (modalType.value === 'update' && currentUser.value) {

    await userManager.updateUser({
      ...form.value,
      id: currentUser.value.id,
      created_at: currentUser.value.created_at,
      updated_at: currentUser.value.created_at
    })
    message.value = 'Registro atualizado com sucesso'

  }
  users.value = await userManager.fetchUsers()
  toggleModal(null)
  isLoading.value = false

  setTimeout(() => {
    message.value = '';
  }, 3000)

}

// Função para deletar um usuário
async function deleteUser(id: number) {
  await userManager.deleteUser(id)
  users.value = await userManager.fetchUsers()
}
</script>

<style scoped>
.modal {
  transition: opacity 0.3s ease;
}
</style>
