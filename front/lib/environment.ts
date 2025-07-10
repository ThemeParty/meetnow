// Environment variables with type safety
const env = {
  // API
  API_BASE_URL: process.env.API_BASE_URL || 'http://175.207.44.51:25353',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001',
} as const

export default env
