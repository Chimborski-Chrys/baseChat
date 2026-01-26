<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-3">
        <!-- Avatar/Logo -->
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <div>
          <h1 class="text-lg font-semibold text-gray-800">Rys - Assistente Virtual</h1>
          <p class="text-xs text-gray-500">Chrystiomar Bonfim</p>
        </div>
      </div>
      <button
        @click="startNewConversation"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Iniciar nova conversa"
      >
        Nova Conversa
      </button>
    </header>

    <!-- Messages Container -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin" ref="messagesContainer">
      <!-- Welcome State -->
      <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
        <div class="text-6xl mb-4">💬</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ welcomeMessage.title }}</h2>
        <p class="text-gray-600 mb-8 max-w-md">{{ welcomeMessage.subtitle }}</p>

        <!-- Example Questions -->
        <div class="w-full max-w-md space-y-2">
          <p class="text-sm font-medium text-gray-700 mb-3">Experimente perguntar:</p>
          <button
            v-for="(example, index) in exampleQuestions"
            :key="index"
            @click="sendExampleQuestion(example)"
            class="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span class="text-gray-700">{{ example }}</span>
          </button>
        </div>
      </div>

      <!-- Messages List -->
      <template v-else>
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'flex gap-3 animate-fade-in',
            message.role === 'user' ? 'justify-end' : 'justify-start'
          ]"
        >
          <!-- Assistant Avatar -->
          <div
            v-if="message.role === 'assistant'"
            class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0"
            aria-hidden="true"
          >
            R
          </div>

          <!-- Message Content -->
          <div
            :class="[
              'max-w-[70%] rounded-2xl px-4 py-2 break-words',
              message.role === 'user'
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
            ]"
          >
            <!-- Render markdown content -->
            <div v-html="renderMarkdown(message.content)"></div>

            <!-- Timestamp -->
            <div
              :class="[
                'text-xs mt-1',
                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
              ]"
            >
              {{ formatTime(message.timestamp) }}
            </div>
          </div>

          <!-- User Avatar -->
          <div
            v-if="message.role === 'user'"
            class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-bold flex-shrink-0"
            aria-hidden="true"
          >
            U
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isLoading" class="flex gap-3 justify-start animate-fade-in">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            R
          </div>
          <div class="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot" style="animation-delay: 0.16s;"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot" style="animation-delay: 0.32s;"></span>
              <span class="ml-2 text-sm text-gray-600">Rys está pensando...</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Error Toast -->
      <transition name="fade">
        <div
          v-if="errorMessage"
          class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md z-50"
          role="alert"
        >
          <span class="text-xl">⚠️</span>
          <span class="flex-1">{{ errorMessage }}</span>
          <button
            @click="errorMessage = ''"
            class="text-red-700 hover:text-red-900 font-bold focus:outline-none"
            aria-label="Fechar mensagem de erro"
          >
            ✕
          </button>
        </div>
      </transition>
    </div>

    <!-- Input Area -->
    <div class="bg-white border-t px-4 py-3 flex gap-2 flex-shrink-0 shadow-lg">
      <textarea
        v-model="inputText"
        ref="textareaRef"
        @keydown.enter.exact.prevent="handleSend"
        @keydown.shift.enter="handleNewLine"
        @input="autoResize"
        :disabled="isLoading"
        :maxlength="maxCharLimit"
        placeholder="Digite sua mensagem..."
        rows="1"
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto max-h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label="Campo de mensagem"
      ></textarea>
      <button
        @click="handleSend"
        :disabled="!canSend"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Enviar mensagem"
      >
        <span v-if="isLoading" class="spinner"></span>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>

    <!-- Character Counter (optional) -->
    <div v-if="inputText.length > maxCharLimit * 0.8" class="bg-white px-4 py-1 text-xs text-gray-500 text-right border-t">
      {{ inputText.length }} / {{ maxCharLimit }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import chatApi from '@/utils/axiosChat'

// ============================================
// REACTIVE STATE
// ============================================

/**
 * Array de mensagens do chat
 * @type {Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>}
 */
const messages = ref([])

/**
 * ID da sessão atual
 * Gerado automaticamente na primeira mensagem e persistido no localStorage
 */
const sessionId = ref(null)

/**
 * Estado de carregamento (aguardando resposta da API)
 */
const isLoading = ref(false)

/**
 * Texto digitado pelo usuário
 */
const inputText = ref('')

/**
 * Mensagem de erro a ser exibida
 */
const errorMessage = ref('')

/**
 * Limite máximo de caracteres por mensagem
 */
const maxCharLimit = 500

/**
 * Mensagem de boas-vindas
 */
const welcomeMessage = {
  title: 'Olá! Sou Rys',
  subtitle: 'Assistente virtual do Chrystiomar Bonfim. Estou aqui para apresentar o perfil profissional dele. Como posso ajudar?'
}

/**
 * Perguntas de exemplo
 */
const exampleQuestions = [
  'Qual é a experiência profissional do Chrystiomar?',
  'Quais tecnologias ele domina?',
  'Me fale sobre os projetos do Chrystiomar'
]

// ============================================
// REFS
// ============================================

const messagesContainer = ref(null)
const textareaRef = ref(null)

// ============================================
// COMPUTED
// ============================================

/**
 * Verifica se pode enviar mensagem
 */
const canSend = computed(() => {
  return inputText.value.trim().length > 0 && !isLoading.value
})

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Gera um ID único para a sessão
 */
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Restaura sessão do localStorage
 */
const restoreSession = () => {
  const savedSessionId = localStorage.getItem('rys-session-id')
  if (savedSessionId) {
    sessionId.value = savedSessionId
    // Opcional: restaurar histórico de mensagens
    const savedMessages = localStorage.getItem('rys-messages')
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        messages.value = parsed.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      } catch (e) {
        console.error('Erro ao restaurar mensagens:', e)
      }
    }
  }
}

/**
 * Persiste sessão no localStorage
 */
const persistSession = () => {
  if (sessionId.value) {
    localStorage.setItem('rys-session-id', sessionId.value)
  }
  // Opcional: salvar histórico (limite de tamanho)
  if (messages.value.length > 0) {
    try {
      localStorage.setItem('rys-messages', JSON.stringify(messages.value.slice(-50)))
    } catch (e) {
      console.error('Erro ao salvar mensagens:', e)
    }
  }
}

/**
 * Inicia nova conversa
 */
const startNewConversation = () => {
  if (messages.value.length > 0) {
    const confirmed = confirm('Deseja iniciar uma nova conversa? O histórico atual será perdido.')
    if (!confirmed) return
  }

  // Limpar estado
  messages.value = []
  sessionId.value = null
  inputText.value = ''
  errorMessage.value = ''

  // Limpar localStorage
  localStorage.removeItem('rys-session-id')
  localStorage.removeItem('rys-messages')
}

// ============================================
// MESSAGE HANDLING
// ============================================

/**
 * Envia mensagem para a API
 */
const sendMessage = async (message) => {
  if (!message.trim() || isLoading.value) return

  // Gerar sessionId se não existir
  if (!sessionId.value) {
    sessionId.value = generateSessionId()
  }

  // Adicionar mensagem do usuário
  const userMessage = {
    role: 'user',
    content: message.trim(),
    timestamp: new Date()
  }
  messages.value.push(userMessage)

  // Limpar input
  inputText.value = ''
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Iniciar loading
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Fazer requisição à API
    const response = await chatApi.post('chat', {
      sessionId: sessionId.value,
      query: message.trim()
    })

    // Validar resposta
    if (!response.data || !response.data.response) {
      throw new Error('Resposta inválida da API')
    }

    // Atualizar sessionId se fornecido pela API
    if (response.data.sessionId) {
      sessionId.value = response.data.sessionId
    }

    // Adicionar resposta do assistente
    const assistantMessage = {
      role: 'assistant',
      content: response.data.response,
      timestamp: new Date()
    }
    messages.value.push(assistantMessage)

    // Persistir sessão
    persistSession()

    // Scroll to bottom
    await nextTick()
    scrollToBottom()

  } catch (error) {
    handleError(error)
  } finally {
    isLoading.value = false
  }
}

/**
 * Handler do botão enviar
 */
const handleSend = () => {
  sendMessage(inputText.value)
}

/**
 * Envia pergunta de exemplo
 */
const sendExampleQuestion = (question) => {
  inputText.value = question
  sendMessage(question)
}

/**
 * Handler de nova linha (Shift+Enter)
 */
const handleNewLine = (event) => {
  // Permitir quebra de linha natural
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Trata erros da API
 */
const handleError = (error) => {
  console.error('Erro no chat:', error)

  // Usar mensagem de erro personalizada se disponível
  let message = error.userMessage || 'Desculpe, ocorreu um erro. Tente novamente.'

  errorMessage.value = message

  // Auto-ocultar após 5 segundos
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}

// ============================================
// UI UTILITIES
// ============================================

/**
 * Scroll automático para a última mensagem
 */
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

/**
 * Auto-resize do textarea
 */
const autoResize = () => {
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px'
  }
}

/**
 * Formata timestamp
 */
const formatTime = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Renderiza markdown básico
 * Suporta: negrito, itálico, listas, quebras de linha
 */
const renderMarkdown = (text) => {
  if (!text) return ''

  let html = text
    // Escape HTML para segurança
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Negrito: **texto** ou __texto__
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Itálico: *texto* ou _texto_ (cuidado para não conflitar com negrito)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
  html = html.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, '<em>$1</em>')

  // Listas não ordenadas: - item
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>')

  // Listas ordenadas: 1. item
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')

  // Quebras de linha
  html = html.replace(/\n/g, '<br>')

  return html
}

// ============================================
// LIFECYCLE
// ============================================

onMounted(() => {
  // Restaurar sessão do localStorage
  restoreSession()

  // Focar no input
  if (textareaRef.value) {
    textareaRef.value.focus()
  }

  // Scroll para o fim se houver mensagens
  if (messages.value.length > 0) {
    nextTick(() => scrollToBottom())
  }
})
</script>

<style scoped>
/* Animação de fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Spinner de loading */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Markdown styles */
.message-content :deep(strong) {
  font-weight: 600;
}

.message-content :deep(em) {
  font-style: italic;
}

.message-content :deep(ul),
.message-content :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.message-content :deep(li) {
  margin: 0.25rem 0;
}
</style>
