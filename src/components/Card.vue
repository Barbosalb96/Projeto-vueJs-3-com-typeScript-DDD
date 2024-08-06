<template>
  <div class="col-md-4">
    <div class="stat-card bg-info text-white">
      <h6>{{ title }}</h6>
      <p class="stat-value" v-if="total">{{ total }}</p>
      <p class="stat-value" v-if="date">{{ date || 'N/A' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['title', 'total', 'date'])
</script>

<style scoped>
.stat-card {
  padding: 20px;
  border-radius: 0.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
}

.stat-card h6 {
  margin: 0;
  font-size: 1rem;
}

.stat-value {
  font-size: 2rem;
  margin: 0;
}
</style>
