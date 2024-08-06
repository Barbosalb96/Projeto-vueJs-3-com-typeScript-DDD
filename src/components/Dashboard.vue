<template>
  <div class="dashboard mb-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Dashboard</h5>
        <div class="row">
          <Card
              v-for="card in cards"
              :key="card.title"
              :title="card.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from "@/components/Card.vue"

const cards = ref([
  { title: "Total de Usuários" },
  { title: "Usuário Mais Recente" },
  { title: "Data Mais Recente" }
])
</script>

<style scoped>
.dashboard {
  margin-bottom: 30px;
}
</style>
