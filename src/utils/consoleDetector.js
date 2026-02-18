/**
 * Detector de limpeza de console
 *
 * Detecta quando o usuário limpa o console e re-exibe a ASCII art automaticamente
 */

import { showWelcomeMessage } from './consoleArt'

/**
 * Monitora quando o console é limpo e re-exibe a ASCII art
 *
 * @param {Function} callback - Função a ser executada quando console for limpo
 */
export function detectConsoleClear(callback) {
  // Salvar referência original do console.clear
  const originalClear = console.clear

  // Sobrescrever console.clear
  console.clear = function(...args) {
    // Executar o clear original
    originalClear.apply(console, args)

    // Executar callback após um pequeno delay
    setTimeout(() => {
      callback()
    }, 100)
  }
}

/**
 * Ativa detecção automática de limpeza de console
 */
export function enableAutoAsciiArt() {
  detectConsoleClear(() => {
    showWelcomeMessage()
  })
}

/**
 * Detecta quando DevTools é aberto pela primeira vez
 * (não é 100% confiável, mas funciona na maioria dos casos)
 */
export function detectDevToolsOpen(callback) {
  let devToolsOpen = false
  const threshold = 160

  const check = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold

    const isOpen = widthThreshold || heightThreshold

    if (isOpen && !devToolsOpen) {
      devToolsOpen = true
      callback()
    } else if (!isOpen && devToolsOpen) {
      devToolsOpen = false
    }
  }

  setInterval(check, 1000)
}

export default {
  detectConsoleClear,
  enableAutoAsciiArt,
  detectDevToolsOpen
}
