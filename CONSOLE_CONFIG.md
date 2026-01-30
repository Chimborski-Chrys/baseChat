# ⚙️ Configuração de Console Logs - Rys Chat

Este guia explica como configurar o estilo dos logs que aparecem no console durante requests da API.

## 🎨 Estilos Disponíveis

Você pode escolher entre 3 estilos de visualização no console:

### 1. **Mini Logo** (Recomendado) ⭐

Mostra um mini badge "🤖 RYS" antes de cada request/response.

**Resultado:**
```
🤖 RYS
📤 REQUEST POST /api/chat
Query: Qual é a experiência do Chrystiomar?

📥 RESPONSE 200
Rys: Chrystiomar Bonfim é um desenvolvedor...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Configuração:**
```js
// src/utils/axiosChat.js
const CONSOLE_LOG_STYLE = 'mini'  // ← Já está configurado (padrão)
```

---

### 2. **Full ASCII Art**

Mostra a ASCII art completa antes de cada response.

**Resultado:**
```
  ___  _ _ ___
 | _ \| | / __|
 |   /|_  \__ \
 |_|_\ |_||___/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📤 REQUEST POST /api/chat
Query: Qual é a experiência do Chrystiomar?

📥 RESPONSE 200
Rys: Chrystiomar Bonfim é um desenvolvedor...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Configuração:**
```js
// src/utils/axiosChat.js
const CONSOLE_LOG_STYLE = 'full'  // ← Mude para 'full'
```

---

### 3. **Clean (Sem ASCII Art)**

Logs simples sem ASCII art, apenas texto.

**Resultado:**
```
📤 REQUEST POST /api/chat
Query: Qual é a experiência do Chrystiomar?

📥 RESPONSE 200
Rys: Chrystiomar Bonfim é um desenvolvedor...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Configuração:**
```js
// src/utils/axiosChat.js
const CONSOLE_LOG_STYLE = 'clean'  // ← Mude para 'clean'
```

---

## 🔧 Como Configurar

### Passo 1: Abrir o arquivo

Edite o arquivo: `src/utils/axiosChat.js`

### Passo 2: Encontrar a constante

Procure por esta linha (está no início do arquivo):

```js
const CONSOLE_LOG_STYLE = 'mini' // ← MUDE AQUI
```

### Passo 3: Alterar o valor

Mude para o estilo desejado:

```js
// Opção 1: Mini logo (recomendado)
const CONSOLE_LOG_STYLE = 'mini'

// Opção 2: ASCII art completa
const CONSOLE_LOG_STYLE = 'full'

// Opção 3: Limpo, sem arte
const CONSOLE_LOG_STYLE = 'clean'
```

### Passo 4: Salvar e testar

1. Salve o arquivo
2. Recarregue a página
3. Abra o console (F12)
4. Envie uma mensagem no chat
5. Veja o novo estilo de log!

---

## 🎯 Funcionalidades Extras

### 1. **Detecção Automática de Limpeza**

Quando você limpa o console (`Ctrl+L` ou `console.clear()`), a ASCII art de boas-vindas reaparece automaticamente!

**Teste:**
1. Abra o console (F12)
2. Limpe o console (Ctrl+L ou digite `console.clear()`)
3. A ASCII art aparece novamente! ✨

**Desativar:**
```js
// src/components/BaseChat.vue
const showConsoleGreeting = () => {
  showWelcomeMessage()
  addConsoleCommands()
  // enableAutoAsciiArt()  // ← Comente esta linha
}
```

---

### 2. **Comandos Interativos**

Digite no console:

```js
help()      // Ver comandos
about()     // Sobre Chrystiomar
stack()     // Stack tecnológica
contact()   // Contato
ascii()     // ASCII art aleatória
```

---

### 3. **Logs Estilizados**

Os logs usam cores e ícones para facilitar a leitura:

- 🤖 **Logo Rys** - Badge azul/roxo
- 📤 **REQUEST** - Azul (#3b82f6)
- 📥 **RESPONSE** - Verde (#10b981)
- ❌ **ERROR** - Vermelho (#ef4444)
- 💬 **Query** - Cinza (#64748b)
- 🎯 **Rys** - Roxo (#8b5cf6)

---

## 🎨 Customização Avançada

### Mudar as cores

Edite `src/utils/consoleArt.js`:

```js
export const consoleStyles = {
  title: 'color: #FF0000; font-size: 20px;',     // Vermelho
  highlight: 'color: #00FF00; font-size: 12px;', // Verde
  // ... etc
}
```

### Mudar a ASCII art usada

Edite `src/utils/axiosChat.js`:

```js
import { consoleStyles, asciiArtBlocky } from './consoleArt'  // ← Mude aqui

// Opções disponíveis:
// - asciiArtBlocky  (grande, blocado)
// - asciiArtSlant   (inclinado)
// - asciiArtSimple  (simples)
// - asciiArtBanner  (banner)
// - asciiArtMini    (mini - padrão)
```

### Adicionar mais informações ao log

Edite os interceptors em `src/utils/axiosChat.js`:

```js
// No interceptor de response
console.log('SessionId:', response.data.sessionId)
console.log('Timestamp:', new Date().toLocaleString())
// ... adicione o que quiser!
```

---

## 🔇 Desabilitar Completamente

### Opção 1: Apenas em produção

Os logs só aparecem em modo de desenvolvimento (`npm run dev`).
Em produção (`npm run build`), os logs não aparecem.

### Opção 2: Desabilitar manualmente

Edite `src/utils/axiosChat.js` e remova/comente os `console.log`:

```js
chatApi.interceptors.response.use(
  (response) => {
    // Comentar todos os console.log
    // console.log(...)
    return response
  }
)
```

---

## 📊 Comparação

| Recurso | Mini | Full | Clean |
|---------|------|------|-------|
| ASCII art | Badge | Completa | Nenhuma |
| Tamanho | Pequeno | Grande | Mínimo |
| Legibilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Visual | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Recomendado | ✅ Sim | Para devs | Minimalista |

---

## 💡 Dicas

1. **Use 'mini' no dia a dia** - Equilibra visual e funcionalidade
2. **Use 'full' para impressionar** - Ótimo para demos e apresentações
3. **Use 'clean' para debug** - Quando precisar focar apenas nos dados
4. **Limpe o console** - Aperte Ctrl+L e veja a mágica acontecer!

---

## ❓ FAQ

**P: Os logs aparecem em produção?**
R: Não! Apenas em modo de desenvolvimento.

**P: Como desabilitar a detecção de limpeza?**
R: Comente `enableAutoAsciiArt()` em `BaseChat.vue`.

**P: Posso criar meu próprio estilo?**
R: Sim! Edite as funções `showMiniLogo()` e `showFullAsciiArt()` em `axiosChat.js`.

**P: Isso afeta a performance?**
R: Não! Os logs só rodam em desenvolvimento e não afetam a aplicação.

**P: Por que não vejo os logs?**
R: Certifique-se de estar em modo dev (`npm run dev`) e com o console aberto.

---

**Divirta-se customizando! 🎨**

Configuração atual: `mini` (recomendado)
