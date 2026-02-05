import axios from 'axios'
import { consoleStyles, asciiArtMini } from './consoleArt'
import { ObfuscationConfig, obfuscateUrl } from './endpointObfuscator'

/**
 * Cliente Axios configurado para a API do chat Rys
 *
 * Endpoints:
 * - POST /api/chat - Enviar mensagem ao assistente
 *   Body: { sessionId: string, query: string }
 *   Response: { response: string, sessionId: string }
 */
const chatApi = axios.create({
  // Se Service Worker estiver ativo, usa endpoint ofuscado
  // Caso contrário, usa endpoint real
  baseURL: ObfuscationConfig.enabled && ObfuscationConfig.useServiceWorker
    ? '/api/v1/' // Endpoint "falso" que aparece no Network
    : (import.meta.env.VITE_API_URL || 'https://localhost:7266/api/'),
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
    // Headers ofuscados
    'X-Client': 'rys-chat',
    'X-Version': '1.0'
  }
})

// ============================================
// CONSOLE LOG STYLES
// ============================================

// Escolha o estilo de log que você prefere:
// 'full'  - Mostra ASCII art completa antes de cada response
// 'mini'  - Mostra mini logo antes de cada response (recomendado)
// 'clean' - Apenas logs normais sem ASCII art
const CONSOLE_LOG_STYLE = 'mini' // ← MUDE AQUI

/**
 * Exibe mini logo antes dos logs
 */
const showMiniLogo = () => {
  if (CONSOLE_LOG_STYLE === 'mini') {
    console.log(
      '%c🤖 RYS',
      'background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 11px;'
    )
  }
}

/**
 * Exibe ASCII art completa
 */
const showFullAsciiArt = () => {
  if (CONSOLE_LOG_STYLE === 'full') {
    console.log('%c' + asciiArtMini, consoleStyles.title)
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━', consoleStyles.info)
  }
}

// Interceptor de requisição
chatApi.interceptors.request.use(
  (config) => {
    // Log de requisição em desenvolvimento
    if (import.meta.env.DEV) {
      // Mostrar logo antes do request
      showMiniLogo()

      console.log(
        '%c📤 REQUEST',
        'color: #3b82f6; font-weight: bold;',
        config.method.toUpperCase(),
        config.url
      )

      if (config.data) {
        console.log('%cQuery:', 'color: #64748b; font-weight: bold;', config.data.query)
      }
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
      // Mostrar ASCII art antes da resposta
      showFullAsciiArt()

      console.log(
        '%c📥 RESPONSE',
        'color: #10b981; font-weight: bold;',
        response.status
      )

      if (response.data?.response) {
        console.log(
          '%cRys:',
          'color: #8b5cf6; font-weight: bold; font-size: 12px;',
          response.data.response
        )
      }

      console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #e5e7eb;')
    }
    return response
  },
  (error) => {
    // Log de erros
    showMiniLogo()

    console.error(
      '%c❌ ERROR',
      'color: #ef4444; font-weight: bold;',
      {
        message: error.message,
        code: error.code,
        response: error.response?.data
      }
    )

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
