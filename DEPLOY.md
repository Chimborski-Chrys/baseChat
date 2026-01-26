# Guia de Deploy - Rys Chat

## 📦 Preparação

### 1. Pré-requisitos

- Node.js 18+ instalado
- Conta no Fly.io ([criar conta](https://fly.io/app/sign-up))
- Fly CLI instalado ([guia de instalação](https://fly.io/docs/hands-on/install-flyctl/))

### 2. Instalar Fly CLI

#### Windows (PowerShell)

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

#### macOS/Linux

```bash
curl -L https://fly.io/install.sh | sh
```

### 3. Verificar Instalação

```bash
fly version
```

## 🚀 Deploy Inicial

### Passo 1: Login no Fly.io

```bash
fly auth login
```

Isso abrirá uma janela do navegador para autenticação.

### Passo 2: Criar Aplicação

```bash
# Entre na pasta do projeto
cd rys-chat

# Crie a aplicação no Fly.io (região São Paulo)
fly apps create rys-chat --region gru
```

Se o nome `rys-chat` já estiver em uso, escolha outro nome único.

### Passo 3: Configurar Variáveis de Ambiente (Opcional)

Se sua API requer URL específica em produção:

```bash
fly secrets set VITE_API_URL=https://sua-api.fly.dev/api/
```

**IMPORTANTE:** As variáveis VITE_ precisam estar definidas no **build time**, não no runtime. Para isso, você tem duas opções:

**Opção A: Build local e deploy**
```bash
# Definir variável antes do build
export VITE_API_URL=https://sua-api.fly.dev/api/  # Linux/Mac
# ou
set VITE_API_URL=https://sua-api.fly.dev/api/     # Windows CMD
# ou
$env:VITE_API_URL="https://sua-api.fly.dev/api/"  # Windows PowerShell

npm run build
fly deploy
```

**Opção B: Editar fly.toml**
```toml
[build]
  [build.args]
    VITE_API_URL = "https://sua-api.fly.dev/api/"
```

Depois edite o Dockerfile para aceitar o ARG:
```dockerfile
# No estágio builder, adicione:
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

### Passo 4: Fazer Deploy

```bash
fly deploy
```

Aguarde o processo de build e deploy (pode levar 2-5 minutos).

### Passo 5: Abrir Aplicação

```bash
fly open
```

Isso abrirá a aplicação no navegador.

## 🔧 Atualizações

### Deploy de Mudanças

Sempre que fizer alterações no código:

```bash
# Commit suas mudanças (opcional, mas recomendado)
git add .
git commit -m "Descrição das mudanças"

# Deploy
fly deploy
```

### Deploy Rápido (sem cache)

```bash
fly deploy --no-cache
```

## 📊 Monitoramento

### Ver Logs em Tempo Real

```bash
fly logs
```

### Ver Status da Aplicação

```bash
fly status
```

### Ver Máquinas Ativas

```bash
fly machines list
```

### Acessar Dashboard

```bash
fly dashboard
```

Ou acesse: https://fly.io/apps/rys-chat

## ⚙️ Configurações Avançadas

### Escalar Aplicação

```bash
# Definir número de instâncias
fly scale count 2

# Aumentar memória
fly scale memory 512

# Mudar tipo de VM
fly scale vm shared-cpu-2x
```

### Configurar Auto-scaling

Edite `fly.toml`:

```toml
[http_service]
  min_machines_running = 1  # Sempre manter 1 instância ativa
  auto_start_machines = true
  auto_stop_machines = "suspend"  # Suspender quando sem tráfego
```

### Health Check

A aplicação já está configurada com health check no endpoint `/health`.

Você pode testar:

```bash
curl https://rys-chat.fly.dev/health
```

## 🔐 Segurança

### HTTPS

O Fly.io fornece HTTPS automaticamente. Sua aplicação estará disponível em:

- https://rys-chat.fly.dev (HTTPS)
- Redirecionamento automático de HTTP para HTTPS

### Headers de Segurança

Já configurados no `nginx.conf`:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

## 🌍 Domínio Customizado (Opcional)

### Adicionar Domínio Próprio

```bash
# Adicionar domínio
fly certs create seudominio.com

# Ver status do certificado
fly certs show seudominio.com
```

Depois configure os registros DNS:

```
A     @    213.188.200.65  (IPv4 do Fly.io - verifique com `fly ips list`)
AAAA  @    [IPv6]          (IPv6 do Fly.io)
```

Ou use CNAME:

```
CNAME  @  rys-chat.fly.dev
```

## 💰 Custos

### Free Tier

O Fly.io oferece um free tier generoso:

- 3 máquinas shared-cpu-1x
- 256MB RAM cada
- 3GB armazenamento persistente
- 160GB transferência mensal

### Preços

Consulte os preços atualizados em: https://fly.io/docs/about/pricing/

### Monitorar Uso

```bash
fly billing
```

## 🐛 Troubleshooting

### Aplicação não inicia

```bash
# Ver logs detalhados
fly logs

# SSH na máquina
fly ssh console

# Verificar dentro do container
ls -la /usr/share/nginx/html
```

### Build falha

```bash
# Ver logs do build
fly logs --build

# Testar build local
docker build -t rys-chat .
docker run -p 8080:8080 rys-chat
```

### Erro de memória

```bash
# Aumentar memória
fly scale memory 512
```

### Reset completo

```bash
# Destruir e recriar
fly apps destroy rys-chat
fly launch
```

## 📚 Recursos Úteis

- [Documentação Fly.io](https://fly.io/docs/)
- [Fly.io Community](https://community.fly.io/)
- [Status Fly.io](https://status.fly.io/)

## ✅ Checklist de Deploy

- [ ] Código testado localmente
- [ ] Variáveis de ambiente configuradas
- [ ] API endpoint configurado corretamente
- [ ] Build local funciona (`npm run build`)
- [ ] Fly CLI instalado e autenticado
- [ ] Aplicação criada no Fly.io
- [ ] Deploy realizado com sucesso
- [ ] Health check funcionando
- [ ] Aplicação acessível via HTTPS
- [ ] Logs sem erros críticos

---

**Dúvidas?** Consulte a [documentação oficial do Fly.io](https://fly.io/docs/) ou abra uma issue no repositório.
