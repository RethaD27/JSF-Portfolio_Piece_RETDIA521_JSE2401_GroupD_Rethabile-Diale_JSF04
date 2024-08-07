<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Product Comparison</h2>
    <div v-if="comparisonList.length === 0" class="text-gray-500">
      Your comparison list is empty
    </div>
    <div v-else>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-4 py-2">Specification</th>
              <th v-for="product in comparisonList" :key="product.id" class="px-4 py-2">
                {{ product.title }}
                <button @click="removeFromComparison(product.id)" class="ml-2 text-red-500">Remove</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2 font-bold">Image</td>
              <td v-for="product in comparisonList" :key="product.id" class="border px-4 py-2">
                <img :src="product.image" :alt="product.title" class="w-32 h-32 object-contain mx-auto" />
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-bold">Price</td>
              <td v-for="product in comparisonList" :key="product.id" class="border px-4 py-2">
                ${{ product.price.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-bold">Description</td>
              <td v-for="product in comparisonList" :key="product.id" class="border px-4 py-2">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2 font-bold">Rating</td>
              <td v-for="product in comparisonList" :key="product.id" class="border px-4 py-2">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="clearComparison" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Clear Comparison</button>
    </div>
  </div>
</template>

<script>
import { useComparison } from '../composables/useComparison'

export default {
  name: 'ComparisonPage',
  setup() {
    const { comparisonList, removeFromComparison, clearComparison } = useComparison()

    return {
      comparisonList,
      removeFromComparison,
      clearComparison
    }
  }
}
</script>