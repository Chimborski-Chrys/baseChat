/**
 * ASCII Art e Console Easter Eggs para o chat Rys
 *
 * Este arquivo contém diferentes estilos de ASCII art e mensagens
 * que podem ser exibidas no console do navegador.
 */

// ============================================
// ESTILOS CSS PARA CONSOLE
// ============================================

export const consoleStyles = {
  title: 'color: #3b82f6; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
  subtitle: 'color: #64748b; font-size: 14px; font-weight: normal;',
  info: 'color: #475569; font-size: 12px;',
  link: 'color: #3b82f6; font-size: 12px; font-weight: bold;',
  highlight: 'color: #8b5cf6; font-size: 12px; font-weight: bold;',
  success: 'color: #10b981; font-size: 12px; font-weight: bold;',
  warning: 'color: #f59e0b; font-size: 12px; font-weight: bold;',
  error: 'color: #ef4444; font-size: 12px; font-weight: bold;',
  reset: 'color: inherit; font-size: inherit; font-weight: inherit;'
}

// ============================================
// ASCII ARTS
// ============================================

/**
 * ASCII Art estilo 1 - Blocky
 */
export const asciiArtBlocky = `
  ██████╗ ██╗   ██╗███████╗
  ██╔══██╗╚██╗ ██╔╝██╔════╝
  ██████╔╝ ╚████╔╝ ███████╗
  ██╔══██╗  ╚██╔╝  ╚════██║
  ██║  ██║   ██║   ███████║
  ╚═╝  ╚═╝   ╚═╝   ╚══════╝
`

/**
 * ASCII Art estilo 2 - Slant
 */
export const asciiArtSlant = `
    ____  _    _____
   / __ \\| |  / / __|
  / /_/ /| | / /\\__ \\
 / _, _/ | |/ / ___/ |
/_/ |_|  |___/ /____/
`

/**
 * ASCII Art estilo 3 - Simple
 */
export const asciiArtSimple = `
  ___  _   _ ___
 | _ \\| | | / __|
 |   /| |_| \\__ \\
 |_|_\\ \\__, |___/
       |___/
`

/**
 * ASCII Art estilo 4 - Banner
 */
export const asciiArtBanner = `
 oooooooooo ooooo  oooo  oooooooo8
  888    888 888  88   888
  888oooo88   888888    888oooooo
  888  88o      88             888
 o888o  88o8   o888o   o88oooo888
`

/**
 * ASCII Art estilo 5 - Mini
 */
export const asciiArtMini = `
  ___  _ _ ___
 | _ \\| | / __|
 |   /|_  \\__ \\
 |_|_\\ |_||___/
`

// ============================================
// MENSAGENS PRÉ-DEFINIDAS
// ============================================

/**
 * Mensagem de boas-vindas completa
 */
export const welcomeMessage = {
  title: '✨ Assistente Virtual | Chrystiomar',
  greeting: '👋 Olá, Desenvolvedor!',
  intro: 'Você encontrou o console! Seja bem-vindo aos bastidores do Rys.',

  stack: {
    title: '🔧 Stack Técnica:',
    items: [
      'Vue.js 3 (Composition API)',
      'Tailwind CSS',
      'Axios',
      'Vite'
    ]
  },

  about: {
    title: '💼 Sobre o Chrystiomar:',
    description: 'Desenvolvedor Full-Stack com expertise em .NET, Vue.js e Azure'
  },

  links: {
    title: '🔗 Links:',
    linkedin: 'https://www.linkedin.com/in/chrystiomar-chimborski-3809a5176/',
    github: 'https://github.com/Chimborski-Chrys',
    portfolio: 'https://chrystiomar.dev'
  },

  tip: {
    title: '💡 Dica:',
    text: 'Quer ver a mágica por trás do Rys? Confira o código fonte!'
  },

  footer: '🚀 Desenvolvido por Chrystiomar'
}

/**
 * Mensagem de recrutamento
 */
export const recruitmentMessage = {
  title: '💼 Procurando Talentos?',
  intro: 'Se você chegou até aqui, provavelmente é um(a) desenvolvedor(a) curioso(a)!',

  skills: [
    '✅ Backend: .NET Core, C#, Entity Framework',
    '✅ Frontend: Vue.js, React, Tailwind CSS',
    '✅ Cloud: Azure, AWS',
    '✅ Database: SQL Server, PostgreSQL, MongoDB',
    '✅ DevOps: Docker, CI/CD, Git'
  ],

  cta: 'Vamos conversar? Entre em contato!',
  contact: 'Email: chrystiomar@example.com'
}

/**
 * Mensagem Easter Egg - Modo Hacker
 */
export const hackerMessage = `
  █████╗  ██████╗ ██████╗███████╗███████╗███████╗
 ██╔══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
 ███████║██║     ██║     █████╗  ███████╗███████╗
 ██╔══██║██║     ██║     ██╔══╝  ╚════██║╚════██║
 ██║  ██║╚██████╗╚██████╗███████╗███████║███████║
 ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝

 ⚠️  ACCESS GRANTED ⚠️
 User: Developer
 Clearance Level: Full
 System: Rys Chat v1.0

 Type 'help()' for available commands...
 Just kidding! 😄
`

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Exibe a mensagem de boas-vindas completa no console
 */
export function showWelcomeMessage(asciiArt = asciiArtBlocky) {
  const s = consoleStyles

  console.log('%c' + asciiArt, s.title)
  console.log('%c' + welcomeMessage.title, s.subtitle)
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', s.info)

  console.log('\n%c' + welcomeMessage.greeting, s.highlight)
  console.log('%c' + welcomeMessage.intro, s.info)

  console.log('\n%c' + welcomeMessage.stack.title, s.highlight)
  welcomeMessage.stack.items.forEach(item => {
    console.log('%c   • ' + item, s.info)
  })

  console.log('\n%c' + welcomeMessage.about.title, s.highlight)
  console.log('%c   ' + welcomeMessage.about.description, s.info)

  console.log('\n%c' + welcomeMessage.links.title, s.highlight)
  console.log('%c   LinkedIn: %c' + welcomeMessage.links.linkedin, s.info, s.link)
  console.log('%c   GitHub: %c' + welcomeMessage.links.github, s.info, s.link)

  console.log('\n%c' + welcomeMessage.tip.title, s.highlight)
  console.log('%c   ' + welcomeMessage.tip.text, s.info)

  console.log('\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', s.info)
  console.log('%c' + welcomeMessage.footer, s.subtitle)
  console.log('\n')
}

/**
 * Exibe mensagem de recrutamento
 */
export function showRecruitmentMessage() {
  const s = consoleStyles

  console.log('\n%c' + recruitmentMessage.title, s.success)
  console.log('%c' + recruitmentMessage.intro, s.info)
  console.log('\n')

  recruitmentMessage.skills.forEach(skill => {
    console.log('%c' + skill, s.info)
  })

  console.log('\n%c' + recruitmentMessage.cta, s.highlight)
  console.log('%c' + recruitmentMessage.contact, s.link)
  console.log('\n')
}

/**
 * Exibe mensagem modo hacker (easter egg)
 */
export function showHackerMessage() {
  console.log('%c' + hackerMessage, consoleStyles.success)
}

/**
 * Adiciona comando customizado ao console (easter egg)
 */
export function addConsoleCommands() {
  // Comando help()
  window.help = () => {
    console.log('%c📚 Comandos Disponíveis:', consoleStyles.highlight)
    console.log('%c   • help() - Mostra esta mensagem', consoleStyles.info)
    console.log('%c   • about() - Informações sobre Chrystiomar', consoleStyles.info)
    console.log('%c   • stack() - Stack tecnológica do projeto', consoleStyles.info)
    console.log('%c   • contact() - Informações de contato', consoleStyles.info)
    console.log('%c   • ascii() - Mostra ASCII art aleatória', consoleStyles.info)
  }

  // Comando about()
  window.about = () => {
    console.log('%c💼 Chrystiomar', consoleStyles.highlight)
    console.log('%c' + welcomeMessage.about.description, consoleStyles.info)
  }

  // Comando stack()
  window.stack = () => {
    console.log('%c🔧 Stack Técnica:', consoleStyles.highlight)
    welcomeMessage.stack.items.forEach(item => {
      console.log('%c   • ' + item, consoleStyles.info)
    })
  }

  // Comando contact()
  window.contact = () => {
    console.log('%c📧 Contato:', consoleStyles.highlight)
    console.log('%c   LinkedIn: ' + welcomeMessage.links.linkedin, consoleStyles.info)
    console.log('%c   GitHub: ' + welcomeMessage.links.github, consoleStyles.info)
  }

  // Comando ascii()
  window.ascii = () => {
    const arts = [asciiArtBlocky, asciiArtSlant, asciiArtSimple, asciiArtBanner, asciiArtMini]
    const random = arts[Math.floor(Math.random() * arts.length)]
    console.log('%c' + random, consoleStyles.title)
  }

  // Mensagem informando que os comandos foram carregados
  console.log('%c💡 Digite help() para ver comandos disponíveis', consoleStyles.warning)
}

// ============================================
// DETECÇÃO DE DEVTOOLS
// ============================================

/**
 * Detecta quando o DevTools é aberto
 * Nota: Não é 100% confiável, mas funciona na maioria dos casos
 */
export function detectDevTools(callback) {
  const threshold = 160 // Diferença de tamanho que indica DevTools aberto

  const devToolsCheck = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold

    if (widthThreshold || heightThreshold) {
      callback()
    }
  }

  // Verificar periodicamente
  setInterval(devToolsCheck, 1000)
}

export default {
  showWelcomeMessage,
  showRecruitmentMessage,
  showHackerMessage,
  addConsoleCommands,
  detectDevTools,
  consoleStyles,
  asciiArtBlocky,
  asciiArtSlant,
  asciiArtSimple,
  asciiArtBanner,
  asciiArtMini
}
