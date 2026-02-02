export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'https://dummyjson.com',
    headers: { 'Content-Type': 'application/json' }
  })

  return {
    provide: {
      api
    }
  }
})
