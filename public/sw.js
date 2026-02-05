/**
 * Service Worker para ofuscar/mascarar endpoints da API
 *
 * Este Service Worker intercepta requisições e modifica as URLs
 * exibidas na aba Network do DevTools
 */

const API_CONFIG = {
  // URL real da API (não será exposta no Network tab)
  realEndpoint: 'https://localhost:7266/api/',

  // URL "falsa" que aparece no Network tab
  fakeEndpoint: '/api/v1/chat',

  // Se deve ofuscar (true) ou mostrar real (false)
  enableObfuscation: true
}

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('%c[SW] Service Worker instalado - Ofuscação ativada', 'color: #10b981; font-weight: bold;')
  self.skipWaiting()
})

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('%c[SW] Service Worker ativado', 'color: #10b981;')
  event.waitUntil(clients.claim())
})

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Se for uma requisição para a API
  if (API_CONFIG.enableObfuscation && url.pathname.includes('/api/')) {
    event.respondWith(handleApiRequest(event.request))
  } else {
    // Deixar passar normalmente
    event.respondWith(fetch(event.request))
  }
})

/**
 * Manipula requisições da API com ofuscação
 */
async function handleApiRequest(request) {
  try {
    // Construir URL real
    const originalUrl = new URL(request.url)
    const realUrl = API_CONFIG.realEndpoint + 'chat'

    // Clonar request com nova URL
    const modifiedRequest = new Request(realUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.clone().text() : null,
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache',
      redirect: 'follow'
    })

    // Fazer request real
    const response = await fetch(modifiedRequest)

    // Retornar resposta
    return response

  } catch (error) {
    console.error('[SW] Erro ao fazer request:', error)

    // Retornar erro
    return new Response(
      JSON.stringify({
        error: 'Erro de rede',
        message: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

/**
 * Mensagens de debug (apenas quando DevTools está aberto)
 */
self.addEventListener('message', (event) => {
  if (event.data.type === 'CHECK_STATUS') {
    event.ports[0].postMessage({
      status: 'active',
      obfuscation: API_CONFIG.enableObfuscation,
      fakeEndpoint: API_CONFIG.fakeEndpoint
    })
  }
})
