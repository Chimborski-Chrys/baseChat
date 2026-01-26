# Rys Chat - Assistente Virtual

Interface de chat profissional para o assistente virtual Rys, representando Chrystiomar Bonfim.

## 🚀 Tecnologias

- **Vue.js 3** - Framework JavaScript progressivo com Composition API
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para requisições API
- **Vite** - Build tool rápido e moderno

## 📋 Funcionalidades

- ✅ Gestão de sessão com persistência no localStorage
- ✅ Interface responsiva (mobile-first)
- ✅ Indicador de "digitando..."
- ✅ Renderização de markdown nas mensagens
- ✅ Tratamento robusto de erros
- ✅ Auto-scroll para última mensagem
- ✅ Suporte para Enter (enviar) e Shift+Enter (nova linha)
- ✅ Limite de caracteres por mensagem (500)
- ✅ Perguntas de exemplo
- ✅ Botão para nova conversa
- ✅ Acessibilidade (ARIA labels, contraste WCAG AA)

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ e npm/yarn

### Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env e configurar a URL da API
# VITE_API_URL=https://sua-api.com/api/
```

### Desenvolvimento

```bash
# Executar em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Build para Produção

```bash
# Criar build de produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Deploy no Fly.io

### Pré-requisitos

- Conta no [Fly.io](https://fly.io)
- Fly CLI instalado ([instruções](https://fly.io/docs/hands-on/install-flyctl/))

### Configuração Inicial

```bash
# Login no Fly.io
fly auth login

# Criar aplicação (se primeira vez)
fly launch

# Ou usar configuração existente
fly apps create rys-chat --region gru
```

### Deploy

```bash
# Fazer deploy
fly deploy

# Ver logs
fly logs

# Abrir aplicação no browser
fly open
```

### Variáveis de Ambiente

Configure variáveis de ambiente sensíveis via Fly.io secrets:

```bash
# Definir URL da API (se necessário)
fly secrets set VITE_API_URL=https://sua-api.fly.dev/api/
```

### Gerenciamento

```bash
# Ver status
fly status

# Ver máquinas em execução
fly machines list

# Escalar aplicação
fly scale count 1

# Ver métricas
fly dashboard
```

## 📡 Integração com API

### Endpoint

```
POST /api/chat
```

### Request Body

```json
{
  "sessionId": "session_abc123...",
  "query": "Qual é a experiência do Chrystiomar?"
}
```

### Response

```json
{
  "response": "Chrystiomar Bonfim é um desenvolvedor...",
  "sessionId": "session_abc123..."
}
```

### Configuração

Edite o arquivo `src/utils/axiosChat.js` para configurar:

- Base URL da API
- Timeout
- Headers customizados
- Interceptors

## 🎨 Customização

### Cores

Edite `tailwind.config.js` para alterar a paleta de cores:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#sua-cor-aqui',
        // ...
      }
    }
  }
}
```

### Mensagens

Edite `src/components/BaseChat.vue`:

```js
const welcomeMessage = {
  title: 'Seu título',
  subtitle: 'Sua descrição'
}

const exampleQuestions = [
  'Pergunta 1',
  'Pergunta 2',
  'Pergunta 3'
]
```

## 🔒 Segurança

- Sanitização de HTML nas mensagens (proteção contra XSS)
- Validação de entrada (limite de caracteres)
- Headers de segurança no nginx
- HTTPS forçado no Fly.io

## 📱 Responsividade

A interface é totalmente responsiva, adaptando-se a:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## ♿ Acessibilidade

- Labels ARIA para screen readers
- Foco visível em elementos interativos
- Contraste adequado (WCAG AA)
- Navegação por teclado

## 🐛 Tratamento de Erros

Erros tratados:

- Timeout de conexão
- Erro de rede
- Erro 500 (servidor)
- Erro 429 (rate limit)
- Erro 401 (não autorizado)
- Erro 400 (requisição inválida)

## 📄 Licença

Este projeto é privado e proprietário.

## 👤 Autor

**Chrystiomar Bonfim**

---

Desenvolvido com ❤️ usando Vue.js 3 e Tailwind CSS
