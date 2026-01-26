# 🚀 Quick Start - Rys Chat

Guia rápido para começar a usar o projeto em **menos de 5 minutos**.

## ⚡ Início Rápido

### 1. Instalar Dependências

```bash
cd rys-chat
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# Windows CMD
copy .env.example .env

# Windows PowerShell / Linux / macOS
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL da sua API:

```env
VITE_API_URL=https://localhost:7266/api/
```

### 3. Executar em Modo Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📋 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

### Deploy no Fly.io

```bash
# Login
fly auth login

# Criar aplicação (primeira vez)
fly apps create rys-chat --region gru

# Deploy
fly deploy

# Ver logs
fly logs

# Abrir no navegador
fly open

# Ver status
fly status
```

### Docker (Local)

```bash
# Build da imagem
docker build -t rys-chat .

# Executar container
docker run -p 8080:8080 rys-chat

# Acessar
open http://localhost:8080
```

## 🔧 Configuração da API

### Desenvolvimento

Edite `.env`:

```env
VITE_API_URL=https://localhost:7266/api/
```

### Produção

**Opção 1: Fly.io Secrets** (não funciona com VITE_*)

```bash
fly secrets set VITE_API_URL=https://sua-api.fly.dev/api/
```

**Opção 2: Build local** (recomendado)

```bash
# Definir variável
export VITE_API_URL=https://sua-api.fly.dev/api/  # Linux/Mac
# ou
$env:VITE_API_URL="https://sua-api.fly.dev/api/"  # PowerShell

# Build e deploy
npm run build
fly deploy
```

**Opção 3: Editar código**

Edite `src/utils/axiosChat.js`:

```js
const chatApi = axios.create({
  baseURL: 'https://sua-api.fly.dev/api/',
  // ...
})
```

## 📁 Estrutura Básica

```
rys-chat/
├── src/
│   ├── components/
│   │   └── BaseChat.vue      ← Componente principal
│   ├── utils/
│   │   └── axiosChat.js      ← Configuração da API
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env                       ← Variáveis de ambiente
├── package.json
├── fly.toml                   ← Config Fly.io
└── Dockerfile
```

## 🎨 Personalização Rápida

### Mudar Cores

Edite `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',  // ← Sua cor aqui
        600: '#2563eb',
      }
    }
  }
}
```

### Mensagem de Boas-vindas

Edite `src/components/BaseChat.vue`:

```js
const welcomeMessage = {
  title: 'Olá! Sou Rys',  // ← Edite aqui
  subtitle: 'Sua mensagem aqui'
}
```

### Perguntas de Exemplo

Edite `src/components/BaseChat.vue`:

```js
const exampleQuestions = [
  'Pergunta 1',  // ← Edite aqui
  'Pergunta 2',
  'Pergunta 3'
]
```

## 🐛 Problemas Comuns

### Porta 3000 já em uso

```bash
# Matar processo na porta 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Build falha

```bash
# Verificar variáveis de ambiente
cat .env

# Build com mais informações
npm run build -- --debug
```

### API não responde

Verifique:
1. URL da API está correta no `.env`
2. API está rodando
3. CORS configurado na API
4. Network tab no DevTools para ver erros

## 📚 Próximos Passos

1. ✅ Projeto rodando localmente
2. 📖 Ler [README.md](README.md) para documentação completa
3. 🚀 Seguir [DEPLOY.md](DEPLOY.md) para publicar
4. 🎨 Customizar cores e mensagens
5. 🔌 Conectar com sua API real

## 💡 Dicas

- Use **Shift+Enter** para quebrar linha no chat
- Sessão é salva no localStorage automaticamente
- Limite de 500 caracteres por mensagem
- Suporta markdown básico (negrito, itálico, listas)

## 🆘 Ajuda

- 📖 [Documentação completa](README.md)
- 🚀 [Guia de deploy](DEPLOY.md)
- 🏗️ [Estrutura do projeto](ESTRUTURA.md)
- 🐛 Issues: Criar issue no repositório

---

**Pronto para começar! 🎉**

Execute `npm run dev` e comece a desenvolver!
