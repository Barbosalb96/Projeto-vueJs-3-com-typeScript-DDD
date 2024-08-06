<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard Produtos</h1>
    </div>
    <div class="card-body p-6">
      <div>
        <div class="stat-card bg-blue-500 text-white p-4 rounded-lg text-center">
          <h6>Total de Produtos</h6>
          <p class="stat-value text-2xl">{{ totalProdutos }}</p>
        </div>
      </div>
    </div>
    <div class="p-6">
      <input
          type="text"
          v-model="busca"
          @input="buscarProdutos"
          class="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Buscar por Nome ou Descrição"
      />
    </div>
  </header>

  <Alert :params="message"/>

  <main class="bg-white shadow my-5">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Preço</th>
                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Status</th>
                <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">ver</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="produto in produtos" :key="produto.id">
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{{
                    produto.id
                  }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ produto.name }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ produto.description }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">R$ {{ produto.price }}</td>
                <td
                    class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800 ">
                  <p :class="statusBg(produto.status)" class="border rounded text-white p-2">
                    {{ produto.status ? 'Ativo' : 'Inativo' }} </p>
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                  <button @click="findProductSearch(produto.id)"
                          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Visualizar
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

  <div v-if="showModal" class="fixed inset-0 z-50">
    <div class="fixed inset-0 bg-gray-900 opacity-50" @click="showModal = false"></div>

    <div class="flex items-center justify-center min-h-screen px-4 py-6">
      <div class="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ productFind?.name }}
          </h3>
          <button @click="showModal = false"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Fechar</span>
          </button>
        </div>
        <div class="p-4 space-y-4">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ productFind?.description }}
          </p>
        </div>
        <div class="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button @click="showModal = false"
                  class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ProductManager} from "@/application/ProductManager";
import {onMounted, ref, computed} from "vue";
import type {ProductEntity} from "@/domain/product/entity/productEntity";
import {HttpProductService} from "@/infrastructure/services/HttpProductService";
import Alert from "@/components/alert.vue";

const productManager = new ProductManager(new HttpProductService());

const produtos = ref<ProductEntity[]>([]);
const carregando = ref(true);
const busca = ref<string>('');
const message = ref<string>('');

const statusBg = (status: number) => {
  return status ? 'bg-green-500' : 'bg-red-500'
}

const showModal = ref<boolean>(false);
const productFind = ref<ProductEntity | null>(null);

const buscarProdutos = async () => {
  carregando.value = true;
  produtos.value = await productManager.getProducts<ProductEntity[]>(busca.value);
  carregando.value = false;
}

const findProductSearch = async (id: number) => {
  productFind.value = await productManager.findProductById(id);
  if (productFind.value != null) {
    showModal.value = true;
  }
}

const totalProdutos = computed(() => produtos.value.length);

onMounted(async () => {
  await buscarProdutos();
});
</script>

<style scoped>
/* Estilos adicionais podem ser colocados aqui */
</style>
