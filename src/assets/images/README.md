# Imagens do Projeto

Esta pasta contém as imagens utilizadas no chat Rys.

## Arquivos

### `rys-bot.png`
- **Uso**: Avatar do assistente virtual Rys
- **Onde é usado**:
  - Header do chat
  - Avatar nas mensagens do assistente
  - Indicador de "digitando..."
  - Tela de boas-vindas
- **Formato**: PNG
- **Recomendações**:
  - Tamanho mínimo: 100x100px
  - Formato quadrado para melhor visualização em círculo
  - Fundo transparente (recomendado)
  - Otimizar para web (< 200KB)

## Adicionando Novas Imagens

Para adicionar uma nova imagem:

1. Adicione o arquivo nesta pasta
2. Importe no componente Vue:
   ```js
   import minhaImagem from '@/assets/images/minha-imagem.png'
   ```
3. Use no template:
   ```vue
   <img :src="minhaImagem" alt="Descrição" />
   ```

## Otimização

Para otimizar imagens:

```bash
# Usando ImageMagick
convert rys-bot.png -resize 200x200 -quality 85 rys-bot-optimized.png

# Usando TinyPNG CLI
tinypng rys-bot.png
```

## Build

Durante o build de produção (Vite), as imagens são:
- Automaticamente otimizadas
- Versionadas (cache-busting)
- Copiadas para `dist/assets/`
