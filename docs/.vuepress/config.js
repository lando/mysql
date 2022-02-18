module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando MySQL Plugin Documentation',
  base: '/mysql/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/mysql/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/mysql/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/mysql',
    sidebarHeader: {
      enabled: true,
      title: 'MySQL Plugin',
      icon: '/images/mysqlicon.png',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.md',
      },
      '/config.md',
      '/support.md',
      {text: 'Examples', link: 'https://github.com/lando/mysql/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/mysql/releases'},
      '/development.md',
    ],
  },
};
