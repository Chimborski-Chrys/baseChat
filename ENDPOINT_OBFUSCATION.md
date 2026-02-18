# 🔒 Ofuscação de Endpoints - Rys Chat

Este guia explica como mascarar/ofuscar os endpoints da API na aba **Network** do DevTools.

## 🎯 O Que Faz

Quando alguém abre a aba **Network (Rede)** do DevTools:

### ❌ Sem Ofuscação
```
Request URL: https://localhost:7266/api/chat
Request Method: POST
```

### ✅ Com Ofuscação (Ativado)
```
Request URL: /api/v1/chat
Request Method: POST
```

O endpoint **real** é mascarado por um endpoint **genérico**!

---

## 🛡️ Tecnologias Usadas

### 1. **Service Worker**
- Intercepta todas as requisições
- Substitui URL real por URL genérica
- Funciona invisível no background
- Não afeta a aplicação

### 2. **Headers Ofuscados**
- Remove informações sensíveis dos headers
- Adiciona headers genéricos

### 3. **Detecção de Network Tab**
- Detecta quando DevTools/Network é aberto
- Mostra mensagem educativa no console

---

## ⚙️ Configuração

### Ativar/Desativar Ofuscação

Edite: `src/utils/endpointObfuscator.js`

```js
export const ObfuscationConfig = {
  // Se deve usar Service Worker
  useServiceWorker: true,  // ← true = ativado

  // Se deve mostrar aviso quando Network tab é aberta
  showWarning: true,

  // Endpoint falso que aparece no Network
  fakeEndpoint: '/api/v1/chat',

  // Ativa/desativa ofuscação globalmente
  enabled: true  // ← MASTER SWITCH
}
```

### Desativar Completamente

```js
enabled: false  // ← Desativa tudo
```

---

## 🧪 Como Testar

**1. Execute o projeto:**
```bash
npm run dev
```

**2. Abra no navegador:**
```
http://localhost:3000
```

**3. Abra DevTools (F12)**

Você verá no console:
```
🛡️ Service Worker registrado
✅ Endpoint ofuscado na aba Network
```

**4. Vá para a aba Network**

Você verá uma mensagem:
```
⚠️ ABA NETWORK DETECTADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ Os endpoints estão protegidos através de:
   • Service Worker (mascaramento de URL)
   • Headers ofuscados
   • Proxy local

💼 Procurando o desenvolvedor por trás disso?
   LinkedIn: https://linkedin.com/in/chrystiomar...
   GitHub: https://github.com/Chimborski-Chrys
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**5. Envie uma mensagem no chat**

**6. Verifique na aba Network**

Você verá:
```
Request URL: /api/v1/chat  ← Endpoint genérico (não o real!)
Request Method: POST
Status: 200
```

---

## 🎨 Níveis de Proteção

### Nível 1: Básico
```js
useServiceWorker: true,
showWarning: true,
enabled: true
```

**O que faz:**
- URL mascarada no Network
- Aviso quando Network é aberto

---

### Nível 2: Intermediário
```js
useServiceWorker: true,
showWarning: true,
encodeUrls: true,  // Codifica em Base64
enabled: true
```

**O que faz:**
- Tudo do Nível 1
- URLs codificadas em Base64

---

### Nível 3: Avançado (Custom)

Edite `public/sw.js`:

```js
const API_CONFIG = {
  realEndpoint: 'https://SUA-API-SECRETA.com/api/',  // ← URL real
  fakeEndpoint: '/api/v1/chat',  // ← URL "fake"
  enableObfuscation: true
}
```

---

## 🔍 O Que Aparece no Network Tab

### Request
```
General:
  Request URL: /api/v1/chat  ← Genérico
  Request Method: POST
  Status Code: 200 OK

Request Headers:
  Content-Type: application/json
  X-Client: rys-chat  ← Header customizado
  X-Version: 1.0

Request Payload:
  {
    "sessionId": "session_...",
    "query": "Sua pergunta"
  }
```

### Response
```
Response Headers:
  Content-Type: application/json

Response Payload:
  {
    "response": "Resposta do bot",
    "sessionId": "session_..."
  }
```

**✅ Endpoint real NÃO aparece!**

---

## ⚠️ Limitações

**Importante entender:**

1. **Não é segurança real** - É ofuscação, não criptografia
2. **Sniffers de rede** (Wireshark, Fiddler) ainda veem tudo
3. **Service Worker pode ser desabilitado** - Usuário técnico pode desativar
4. **Não substitui autenticação** - Use tokens, API keys, etc.

**Propósito:**
- Dificultar análise casual
- Esconder endpoints de curiosos
- Adicionar camada extra de "segurança por obscuridade"
- Profissionalismo

**NÃO usar como única proteção!**

---

## 🎭 Customização

### Mudar Endpoint Falso

```js
// src/utils/endpointObfuscator.js
fakeEndpoint: '/api/v2/assistant'  // ← Mude aqui
```

### Adicionar Mais Headers Ofuscados

```js
// src/utils/axiosChat.js
headers: {
  'Content-Type': 'application/json',
  'X-Client': 'rys-chat',
  'X-Version': '1.0',
  'X-Custom': 'meu-valor',  // ← Adicione aqui
}
```

### Mudar Mensagem de Aviso

```js
// src/utils/endpointObfuscator.js
export function showNetworkWarning() {
  console.log('%c🔒 MEU AVISO CUSTOMIZADO', '...')
  // ... customize a mensagem
}
```

---

## 🔧 Troubleshooting

### Service Worker não registra

**Problema:** Não vê mensagem "Service Worker registrado"

**Solução:**
1. Verifique se está em HTTPS ou localhost
2. Service Workers só funcionam em contexto seguro
3. Limpe cache do navegador
4. Verifique console por erros

**Verificar manualmente:**
```
DevTools → Application → Service Workers
```

Deve aparecer: `sw.js` - Status: Activated

---

### Endpoint real ainda aparece

**Problema:** URL real aparece no Network

**Solução:**
1. Verifique se `enabled: true` em `endpointObfuscator.js`
2. Verifique se Service Worker está ativo
3. Recarregue a página (Ctrl+Shift+R)
4. Limpe cache

---

### Erro ao fazer requests

**Problema:** Requests falham depois de ativar ofuscação

**Solução:**
1. Verifique CORS na sua API
2. Edite `public/sw.js` e ajuste `mode: 'cors'`
3. Adicione headers CORS permitidos
4. Teste com `enabled: false` primeiro

---

## 🚀 Produção

### Em Produção (Build)

O Service Worker funciona automaticamente:

```bash
npm run build
```

O arquivo `sw.js` será incluído no build e servirá junto com a aplicação.

**Importante:**
- Teste o build antes: `npm run preview`
- Service Worker é cacheado - para atualizar, mude a versão
- Use HTTPS em produção (obrigatório para SW)

---

## 📊 Comparação

| Recurso | Sem Ofuscação | Com Ofuscação |
|---------|---------------|---------------|
| URL visível | ✅ Real | ❌ Genérica |
| Headers | ✅ Todos | ⚠️ Filtrados |
| Payload | ✅ Visível | ✅ Visível* |
| Sniffers | ✅ Veem tudo | ✅ Veem tudo* |
| DevTools | ✅ Tudo exposto | ⚠️ URL oculta |

*Payload e sniffers sempre veem dados reais (criptografe se necessário)

---

## 💡 Boas Práticas

### ✅ Faça

- Use ofuscação + autenticação (tokens)
- Configure HTTPS em produção
- Adicione rate limiting na API
- Monitore acessos suspeitos
- Atualize Service Worker regularmente

### ❌ Não Faça

- Confiar apenas em ofuscação
- Expor API keys no código
- Esquecer de validar no backend
- Assumir que é "segurança real"
- Negligenciar CORS

---

## 🎓 Aprendizado

**Por que empresas fazem isso?**

- **Netflix** - Ofusca endpoints de streaming
- **Spotify** - Mascara URLs de API de música
- **Google** - Usa Service Workers para PWAs
- **Discord** - Protege endpoints de chat

**Benefícios:**
1. Dificulta engenharia reversa
2. Reduz scraping/bots
3. Profissionalismo
4. Camada extra de proteção

---

## 🔐 Segurança Adicional (Recomendado)

Além da ofuscação, implemente:

1. **API Key/Token** - Autenticação real
2. **Rate Limiting** - Previne abuso
3. **CORS restrito** - Apenas domínios permitidos
4. **HTTPS** - Criptografia de transporte
5. **Validação Backend** - Nunca confie no frontend
6. **Logging** - Monitore acessos

---

## 📚 Recursos

- [Service Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## 🎯 Status Atual

```
✅ Service Worker: ATIVADO
✅ Ofuscação de URL: ATIVADA
✅ Detecção Network Tab: ATIVADA
✅ Headers customizados: ATIVADOS
✅ Aviso educativo: ATIVADO
```

**Endpoint no Network:** `/api/v1/chat`
**Endpoint real:** `https://localhost:7266/api/chat` (oculto)

---

**Pronto para testar! 🎉**

Abra F12 → Network → Envie uma mensagem → Veja a mágica acontecer!

**Lembre-se:** Ofuscação ≠ Segurança. Use autenticação real!
