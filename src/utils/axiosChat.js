import axios from 'axios'

/**
 * Cliente Axios configurado para a API do chat Rys
 *
 * Endpoints:
 * - POST /api/chat - Enviar mensagem ao assistente
 *   Body: { sessionId: string, query: string }
 *   Response: { response: string, sessionId: string }
 */
const chatApi = axios.create({
  // Altere para a URL da sua API em produção
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7266/api/',
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de requisição
chatApi.interceptors.request.use(
  (config) => {
    // Log de requisição em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('[Chat API Request]:', config.method.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de resposta
chatApi.interceptors.response.use(
  (response) => {
    // Log de resposta em desenvolvimento
    if (import.meta.env.DEV) {
      console.log('[Chat API Response]:', response.status, response.data)
    }
    return response
  },
  (error) => {
    // Log de erros
    console.error('[Chat API Error]:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    })

    // Adicionar informações úteis ao erro
    if (error.code === 'ECONNABORTED') {
      error.userMessage = 'A conexão demorou muito tempo. Tente novamente.'
    } else if (!error.response) {
      error.userMessage = 'Sem conexão com o servidor. Verifique sua internet.'
    } else if (error.response.status >= 500) {
      error.userMessage = 'Erro no servidor. Tente novamente em instantes.'
    } else if (error.response.status === 429) {
      error.userMessage = 'Muitas requisições. Aguarde alguns instantes.'
    } else if (error.response.status === 401) {
      error.userMessage = 'Não autorizado. Verifique suas credenciais.'
    } else if (error.response.status === 400) {
      error.userMessage = error.response.data?.message || 'Requisição inválida.'
    }

    return Promise.reject(error)
  }
)

export default chatApi
