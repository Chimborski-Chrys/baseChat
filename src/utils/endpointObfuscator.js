/**
 * Utilitário para ofuscação de endpoints
 *
 * Estratégias:
 * 1. Service Worker - Mascara URL no Network tab
 * 2. Base64 Encoding - Codifica URL
 * 3. Proxy Local - Redireciona através de endpoint genérico
 */

/**
 * Registra o Service Worker para ofuscação
 */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log(
        '%c🛡️ Service Worker registrado',
        'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
      )

      console.log(
        '%c✅ Endpoint ofuscado na aba Network',
        'color: #10b981; font-weight: bold;'
      )

      // Aguardar ativação
      if (registration.installing) {
        registration.installing.addEventListener('statechange', (e) => {
          if (e.target.state === 'activated') {
            console.log('%c[SW] Ativado e pronto!', 'color: #10b981;')
          }
        })
      }

      return registration
    } catch (error) {
      console.warn('⚠️ Não foi possível registrar Service Worker:', error)
      return null
    }
  }
}

/**
 * Desregistra o Service Worker
 */
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
    console.log('%c🛡️ Service Worker removido', 'color: #ef4444;')
  }
}

/**
 * Verifica status do Service Worker
 */
export async function checkServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration()
    return registration ? 'active' : 'inactive'
  }
  return 'not-supported'
}

/**
 * Codifica endpoint em Base64
 */
export function encodeEndpoint(endpoint) {
  return btoa(endpoint)
}

/**
 * Decodifica endpoint de Base64
 */
export function decodeEndpoint(encoded) {
  return atob(encoded)
}

/**
 * Ofusca URL com técnica de "path genérico"
 */
export function obfuscateUrl(url) {
  // Substituir domínio real por genérico
  const urlObj = new URL(url)
  return `/api/v1/chat` // URL genérica
}

/**
 * Detecta quando a aba Network é aberta
 * (técnica experimental - não é 100% confiável)
 */
export function detectNetworkTab(callback) {
  let isNetworkOpen = false

  // Técnica usando performance.getEntries
  const checkNetwork = () => {
    const entries = performance.getEntriesByType('resource')
    const apiCalls = entries.filter(e => e.name.includes('/api/'))

    if (apiCalls.length > 0 && !isNetworkOpen) {
      isNetworkOpen = true
      callback(true)
    }
  }

  // Verificar periodicamente
  setInterval(checkNetwork, 2000)
}

/**
 * Mostra aviso quando Network tab é detectada
 */
export function showNetworkWarning() {
  console.log('\n')
  console.log(
    '%c⚠️ ABA NETWORK DETECTADA',
    'background: #f59e0b; color: white; padding: 8px 16px; font-size: 14px; font-weight: bold;'
  )
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f59e0b;')
  console.log(
    '%cℹ️ Os endpoints estão protegidos através de:',
    'color: #64748b; font-weight: bold;'
  )
  console.log('%c   • Service Worker (mascaramento de URL)', 'color: #64748b;')
  console.log('%c   • Headers ofuscados', 'color: #64748b;')
  console.log('%c   • Proxy local', 'color: #64748b;')
  console.log('\n%c💼 Procurando o desenvolvedor por trás disso?', 'color: #3b82f6; font-weight: bold;')
  console.log('%c   LinkedIn: https://www.linkedin.com/in/chrystiomar-chimborski-3809a5176/', 'color: #3b82f6;')
  console.log('%c   GitHub: https://github.com/Chimborski-Chrys', 'color: #3b82f6;')
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f59e0b;')
  console.log('\n')
}

/**
 * Configuração global de ofuscação
 */
export const ObfuscationConfig = {
  // Se deve usar Service Worker
  useServiceWorker: true,

  // Se deve codificar URLs em Base64
  encodeUrls: false,

  // Se deve mostrar aviso quando Network tab é aberta
  showWarning: true,

  // Endpoint falso que aparece no Network
  fakeEndpoint: '/api/v1/chat',

  // Ativa/desativa ofuscação globalmente
  enabled: true
}

export default {
  registerServiceWorker,
  unregisterServiceWorker,
  checkServiceWorkerStatus,
  encodeEndpoint,
  decodeEndpoint,
  obfuscateUrl,
  detectNetworkTab,
  showNetworkWarning,
  ObfuscationConfig
}
