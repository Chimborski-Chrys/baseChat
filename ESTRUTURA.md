# Estrutura do Projeto

```
rys-chat/
│
├── .vscode/                      # Configurações do VS Code
│   ├── settings.json            # Configurações do editor
│   └── extensions.json          # Extensões recomendadas
│
├── src/                         # Código fonte
│   ├── components/              # Componentes Vue
│   │   └── BaseChat.vue        # Componente principal do chat
│   │
│   ├── utils/                   # Utilitários
│   │   └── axiosChat.js        # Cliente HTTP configurado
│   │
│   ├── assets/                  # Assets estáticos (imagens, etc)
│   │
│   ├── App.vue                  # Componente raiz
│   ├── main.js                  # Entry point
│   └── style.css                # Estilos globais (Tailwind)
│
├── public/                      # Arquivos públicos (servidos como estão)
│
├── .env                         # Variáveis de ambiente (local)
├── .env.example                 # Template de variáveis de ambiente
├── .dockerignore               # Arquivos ignorados no build Docker
├── .gitignore                  # Arquivos ignorados no Git
│
├── Dockerfile                   # Configuração Docker
├── nginx.conf                   # Configuração Nginx
├── fly.toml                     # Configuração Fly.io
│
├── package.json                 # Dependências e scripts npm
├── vite.config.js              # Configuração Vite
├── tailwind.config.js          # Configuração Tailwind CSS
├── postcss.config.js           # Configuração PostCSS
│
├── index.html                   # HTML principal
│
├── README.md                    # Documentação principal
├── DEPLOY.md                    # Guia de deploy
└── ESTRUTURA.md                 # Este arquivo
```

## 📁 Detalhamento de Pastas

### `/src`
Código fonte da aplicação Vue.js

- **components/**: Componentes Vue reutilizáveis
  - `BaseChat.vue`: Interface principal do chat com toda a lógica

- **utils/**: Funções e configurações utilitárias
  - `axiosChat.js`: Cliente Axios configurado para API do chat

- **assets/**: Imagens, fontes e outros recursos estáticos processados pelo Vite

### `.vscode/`
Configurações específicas do Visual Studio Code

- `settings.json`: Formatação automática, linting, etc.
- `extensions.json`: Extensões recomendadas (Vue, Tailwind, etc.)

## 📄 Arquivos de Configuração

### Build & Dev

- **vite.config.js**: Configuração do bundler Vite
- **tailwind.config.js**: Configuração do Tailwind (cores, animações, etc.)
- **postcss.config.js**: Processamento CSS (Tailwind + Autoprefixer)
- **package.json**: Dependências e scripts

### Deploy

- **Dockerfile**: Instruções para criar imagem Docker
- **nginx.conf**: Configuração do servidor web Nginx
- **fly.toml**: Configuração da aplicação no Fly.io
- **.dockerignore**: Arquivos excluídos do build Docker

### Environment

- **.env**: Variáveis de ambiente locais (não commitado)
- **.env.example**: Template de variáveis de ambiente

## 🔑 Arquivos Principais

### `src/components/BaseChat.vue`
Componente principal que implementa:

- Interface do chat (header, mensagens, input)
- Lógica de comunicação com API
- Gestão de sessão e persistência
- Renderização de markdown
- Tratamento de erros
- Responsividade e acessibilidade

### `src/utils/axiosChat.js`
Cliente HTTP configurado:

- Base URL da API
- Timeout de 30 segundos
- Interceptors de request/response
- Tratamento de erros
- Logging (desenvolvimento)

### `fly.toml`
Configuração do deploy:

- Região (gru - São Paulo)
- Tamanho da VM (shared-cpu-1x)
- Auto-scaling
- Health checks

## 🚀 Fluxo de Build

### Desenvolvimento
```
npm run dev
  ↓
Vite server (HMR)
  ↓
http://localhost:3000
```

### Produção (Local)
```
npm run build
  ↓
Vite build
  ↓
dist/ (arquivos otimizados)
  ↓
npm run preview
  ↓
http://localhost:8080
```

### Deploy (Fly.io)
```
fly deploy
  ↓
Docker build
  ↓
npm ci (instalar deps)
  ↓
npm run build (gerar dist/)
  ↓
Copiar dist/ para nginx
  ↓
Deploy na região GRU
  ↓
https://rys-chat.fly.dev
```

## 📦 Dependências

### Produção
- **vue**: ^3.4.15 - Framework JavaScript
- **axios**: ^1.6.5 - Cliente HTTP

### Desenvolvimento
- **@vitejs/plugin-vue**: ^5.0.3 - Plugin Vite para Vue
- **vite**: ^5.0.12 - Build tool
- **tailwindcss**: ^3.4.1 - Framework CSS
- **autoprefixer**: ^10.4.17 - Prefixos CSS
- **postcss**: ^8.4.33 - Processador CSS

## 🎨 Customização

### Adicionar nova página

1. Criar componente em `src/components/MinhaPage.vue`
2. Importar e usar em `src/App.vue`

### Adicionar nova utilitário

1. Criar arquivo em `src/utils/meuUtil.js`
2. Exportar funções
3. Importar onde necessário

### Modificar estilos

1. Editar `tailwind.config.js` para temas
2. Adicionar classes utilitárias em `src/style.css`
3. Usar classes Tailwind nos componentes

## 🔒 Segurança

### Arquivos Sensíveis (não commitados)

- `.env` - Variáveis locais
- `node_modules/` - Dependências
- `dist/` - Build de produção

### Arquivos Públicos

- Todo o resto é commitado no Git
- Nenhuma credencial deve estar no código

---

**Nota:** Esta estrutura segue as melhores práticas para aplicações Vue.js modernas com Tailwind CSS.
