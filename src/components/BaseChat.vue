<template>
  <div
    class="flex flex-col h-screen bg-white dark:bg-[#111111] text-gray-800 dark:text-[#ececec] transition-colors duration-300"
  >
    <header
      class="h-14 px-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md sticky top-0 z-10"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 p-[1px]"
        >
          <img
            :src="rysBotAvatar"
            class="w-full h-full rounded-full object-cover border border-white/20"
          />
        </div>
        <div class="flex flex-col">
          <span
            class="font-medium text-sm text-gray-900 dark:text-white leading-tight"
            >Rys AI</span
          >
          <span class="text-[10px] text-gray-500 dark:text-gray-400"
            >Online agora</span
          >
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="startNewConversation"
          class="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          title="Nova Conversa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto scrollbar-hide" ref="messagesContainer">
      <div class="max-w-3xl mx-auto w-full p-4 md:px-0 space-y-10 py-10">
        <div
          v-if="messages.length === 0"
          class="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div class="relative w-16 h-16 mb-8 group">
            <div
              class="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
            ></div>
            <img
              :src="rysBotAvatar"
              class="relative w-16 h-16 rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
          <h2
            class="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 bg-clip-text text-transparent mb-8"
          >
            {{ welcomeMessage.title }}
          </h2>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4"
          >
            <button
              v-for="(example, index) in exampleQuestions"
              :key="index"
              @click="sendExampleQuestion(example)"
              class="text-left p-4 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm group"
            >
              {{ example }}
              <span
                class="block text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >Sugerir pergunta</span
              >
            </button>
          </div>
        </div>

        <template v-else>
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="group w-full animate-in fade-in slide-in-from-bottom-3 duration-500"
          >
            <div
              :class="[
                'flex gap-4 max-w-3xl mx-auto items-start px-4 md:px-0',
                message.role === 'user' ? 'flex-row-reverse' : '',
              ]"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm',
                  message.role === 'user'
                    ? 'bg-[#2f2f2f] text-white'
                    : 'bg-white border border-gray-100 dark:border-white/10',
                ]"
              >
                <span v-if="message.role === 'user'">U</span>
                <img
                  v-else
                  :src="rysBotAvatar"
                  class="w-full h-full object-cover"
                />
              </div>

              <div
                :class="[
                  'flex flex-col max-w-[85%]',
                  message.role === 'user' ? 'items-end' : 'items-start',
                ]"
              >
                <div
                  :class="[
                    'px-4 py-2.5 rounded-2xl leading-relaxed text-[15px]',
                    message.role === 'user'
                      ? 'bg-[#f4f4f4] dark:bg-[#2f2f2f] text-gray-800 dark:text-white'
                      : 'text-gray-800 dark:text-gray-200 bg-transparent',
                  ]"
                >
                  <div
                    class="prose dark:prose-invert prose-slate max-w-none"
                    v-html="renderMarkdown(message.content)"
                  ></div>
                </div>
                <time class="text-[9px] text-gray-400 mt-2 px-1 font-mono">{{
                  formatTime(message.timestamp)
                }}</time>
              </div>
            </div>
          </div>

          <div
            v-if="isLoading"
            class="flex gap-4 max-w-3xl mx-auto items-start px-4 md:px-0"
          >
            <div
              class="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center"
            >
              <span class="flex gap-1">
                <span
                  class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                ></span>
                <span
                  class="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"
                ></span>
                <span
                  class="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"
                ></span>
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div
      class="pb-6 pt-2 px-4 bg-gradient-to-t from-white via-white dark:from-[#111111] dark:via-[#111111] to-transparent"
    >
      <div class="max-w-3xl mx-auto relative">
        <div
          class="relative flex items-end w-full bg-[#f4f4f4] dark:bg-[#2f2f2f] rounded-[28px] border border-transparent focus-within:border-gray-200 dark:focus-within:border-white/20 focus-within:bg-white dark:focus-within:bg-[#242424] focus-within:shadow-xl transition-all duration-200 p-2"
        >
          <textarea
            v-model="inputText"
            ref="textareaRef"
            @keydown.enter.exact.prevent="handleSend"
            @input="autoResize"
            :disabled="isLoading"
            placeholder="Pergunte ao Rys..."
            rows="1"
            class="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-gray-800 dark:text-white max-h-52 text-[15px] placeholder-gray-500"
          ></textarea>

          <button
            @click="handleSend"
            :disabled="!canSend"
            class="mb-1 mr-1 w-10 h-10 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black disabled:bg-gray-200 dark:disabled:bg-white/5 disabled:text-gray-400 transition-all active:scale-90"
          >
            <svg
              v-if="!isLoading"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
              />
            </svg>
            <div
              v-else
              class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            ></div>
          </button>
        </div>
        <p class="text-[10px] text-center text-gray-500 mt-3 tracking-wide">
          IA focada no portfólio de Chrystiomar
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import chatApi from "@/utils/axiosChat";
import rysBotAvatar from "@/assets/images/rys-bot.png";
import { showWelcomeMessage, addConsoleCommands } from "@/utils/consoleArt";
import { enableAutoAsciiArt } from "@/utils/consoleDetector";
import {
  registerServiceWorker,
  detectNetworkTab,
  showNetworkWarning,
  ObfuscationConfig,
} from "@/utils/endpointObfuscator";

// ============================================
// REACTIVE STATE
// ============================================

/**
 * Array de mensagens do chat
 * @type {Array<{role: 'user' | 'assistant', content: string, timestamp: Date}>}
 */
const messages = ref([]);

/**
 * ID da sessão atual
 * Gerado automaticamente na primeira mensagem
 * Mantido APENAS na memória (não persiste - fecha navegador = perde tudo)
 */
const sessionId = ref(null);

/**
 * Estado de carregamento (aguardando resposta da API)
 */
const isLoading = ref(false);

/**
 * Texto digitado pelo usuário
 */
const inputText = ref("");

/**
 * Mensagem de erro a ser exibida
 */
const errorMessage = ref("");

/**
 * Limite máximo de caracteres por mensagem
 */
const maxCharLimit = 500;

/**
 * Mensagem de boas-vindas
 */
const welcomeMessage = {
  title: "Olá! Sou Rys",
  subtitle:
    "Assistente virtual do Chrystiomar. Estou aqui para apresentar o perfil profissional dele. Como posso ajudar?",
};

/**
 * Perguntas de exemplo
 */
const exampleQuestions = [
  "Qual é a experiência profissional do Chrystiomar?",
  "Quais tecnologias ele domina?",
  "Me fale sobre os projetos do Chrystiomar",
];

// ============================================
// REFS
// ============================================

const messagesContainer = ref(null);
const textareaRef = ref(null);

// ============================================
// COMPUTED
// ============================================

/**
 * Verifica se pode enviar mensagem
 */
const canSend = computed(() => {
  return inputText.value.trim().length > 0 && !isLoading.value;
});

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Gera um ID único para a sessão
 */
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// ✨ Sessão mantida APENAS na memória (não persiste)
// Fecha navegador = conversa perdida (comportamento desejado)

/**
 * Inicia nova conversa
 */
const startNewConversation = () => {
  if (messages.value.length > 0) {
    const confirmed = confirm(
      "Deseja iniciar uma nova conversa? O histórico atual será perdido."
    );
    if (!confirmed) return;
  }

  // Limpar estado (apenas memória)
  messages.value = [];
  sessionId.value = null;
  inputText.value = "";
  errorMessage.value = "";
};

// ============================================
// MESSAGE HANDLING
// ============================================

/**
 * Envia mensagem para a API
 */
const sendMessage = async (message) => {
  if (!message.trim() || isLoading.value) return;

  // Gerar sessionId se não existir
  if (!sessionId.value) {
    sessionId.value = generateSessionId();
  }

  // Adicionar mensagem do usuário
  const userMessage = {
    role: "user",
    content: message.trim(),
    timestamp: new Date(),
  };
  messages.value.push(userMessage);

  // Limpar input
  inputText.value = "";
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
  }

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  // Iniciar loading
  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Fazer requisição à API
    const response = await chatApi.post("chat", {
      sessionId: sessionId.value,
      query: message.trim(),
    });

    // Validar resposta
    if (!response.data || !response.data.response) {
      throw new Error("Resposta inválida da API");
    }

    // Atualizar sessionId se fornecido pela API
    if (response.data.sessionId) {
      sessionId.value = response.data.sessionId;
    }

    // Adicionar resposta do assistente
    const assistantMessage = {
      role: "assistant",
      content: response.data.response,
      timestamp: new Date(),
    };
    messages.value.push(assistantMessage);

    // Scroll to bottom
    await nextTick();
    scrollToBottom();
  } catch (error) {
    handleError(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handler do botão enviar
 */
const handleSend = () => {
  sendMessage(inputText.value);
};

/**
 * Envia pergunta de exemplo
 */
const sendExampleQuestion = (question) => {
  inputText.value = question;
  sendMessage(question);
};

/**
 * Handler de nova linha (Shift+Enter)
 */
const handleNewLine = (event) => {
  // Permitir quebra de linha natural
};

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Trata erros da API
 */
const handleError = (error) => {
  console.error("Erro no chat:", error);

  // Usar mensagem de erro personalizada se disponível
  let message =
    error.userMessage || "Desculpe, ocorreu um erro. Tente novamente.";

  errorMessage.value = message;

  // Auto-ocultar após 5 segundos
  setTimeout(() => {
    errorMessage.value = "";
  }, 5000);
};

// ============================================
// UI UTILITIES
// ============================================

/**
 * Scroll automático para a última mensagem
 */
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

/**
 * Auto-resize do textarea
 */
const autoResize = () => {
  const textarea = textareaRef.value;
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
  }
};

/**
 * Formata timestamp
 */
const formatTime = (date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Renderiza markdown básico
 * Suporta: negrito, itálico, listas, quebras de linha
 */
const renderMarkdown = (text) => {
  if (!text) return "";

  let html = text
    // Escape HTML para segurança
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Negrito: **texto** ou __texto__
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Itálico: *texto* ou _texto_ (cuidado para não conflitar com negrito)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  html = html.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");

  // Listas não ordenadas: - item
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(
    /(<li.*<\/li>)/s,
    '<ul class="list-disc list-inside my-2">$1</ul>'
  );

  // Listas ordenadas: 1. item
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');

  // Quebras de linha
  html = html.replace(/\n/g, "<br>");

  return html;
};

// ============================================
// CONSOLE EASTER EGG
// ============================================

/**
 * Exibe ASCII art e mensagem no console
 * Também adiciona comandos interativos: help(), about(), stack(), contact(), ascii()
 */
const showConsoleGreeting = () => {
  // Exibir mensagem de boas-vindas com ASCII art
  showWelcomeMessage();

  // Adicionar comandos interativos ao console
  addConsoleCommands();

  // Ativar detecção de limpeza de console (re-exibe ASCII art automaticamente)
  enableAutoAsciiArt();
};

// ============================================
// LIFECYCLE
// ============================================

onMounted(async () => {
  // Registrar Service Worker para ofuscação de endpoints
  if (ObfuscationConfig.enabled && ObfuscationConfig.useServiceWorker) {
    await registerServiceWorker();
  }

  // Detectar quando aba Network é aberta e mostrar aviso
  if (ObfuscationConfig.showWarning) {
    detectNetworkTab(() => {
      showNetworkWarning();
    });
  }

  // Exibir mensagem no console
  showConsoleGreeting();

  // Focar no input
  if (textareaRef.value) {
    textareaRef.value.focus();
  }

  // Scroll para o fim se houver mensagens
  if (messages.value.length > 0) {
    nextTick(() => scrollToBottom());
  }
});
</script>

<style scoped>
/* Reset de tipografia para Markdown */
:deep(.prose) {
  --tw-prose-body: inherit;
  --tw-prose-headings: #111827;
  font-size: 15px;
  line-height: 1.6;
}

:deep(.prose-invert) {
  --tw-prose-headings: #ffffff;
  --tw-prose-bold: #ffffff;
}

:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

:deep(.prose strong) {
  font-weight: 600;
}

/* Esconder scrollbar mantendo funcionalidade */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

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
