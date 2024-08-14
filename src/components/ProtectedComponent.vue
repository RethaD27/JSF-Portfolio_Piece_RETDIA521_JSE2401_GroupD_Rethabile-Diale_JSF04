<template>
  <div class="protected-component">
    <h2 class="text-2xl font-bold mb-4">Protected Area</h2>
    <p class="mb-4">Welcome to the protected area. This content is only visible to authenticated users.</p>
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <p class="font-bold">Authenticated</p>
      <p>You have successfully accessed a protected route.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProtectedComponent',
  setup() {
    // You can add any component-specific logic here
    return {}
  }
}
</script>

<style scoped>
.protected-component {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>