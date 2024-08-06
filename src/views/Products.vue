<template>

  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard Produtos</h1>
    </div>
    <div class="card-body p-6">
      <div class="">
        <div class="stat-card bg-blue-500 text-white p-4 rounded-lg text-center">
          <h6>Total de Produtos</h6>
          <p class="stat-value text-2xl">{{ totalProdutos }}</p>
        </div>
      </div>
    </div>

    <div class="p-6">
      <input
          type="text"
          v-model="busca" @blur="buscarProdutos"
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
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="produto in produtos" :key="produto.id">
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{{ produto.id }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ produto.name }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ produto.description }}</td>
                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">R$ {{ produto.price }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>

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

const buscarProdutos = async () => {
  carregando.value = true;
  produtos.value = await productManager.getProducts<ProductEntity[]>(busca.value);
  carregando.value = false;
}

const totalProdutos = computed(() => produtos.value.length);

onMounted(async () => {
  await buscarProdutos();
});
</script>

<style scoped>
</style>
