👤 Autor

# DANYLO AMORIM LOPES

# QA Engineer – Automação Mobile

---

# 📱 Projeto de Automação Mobile – WebdriverIO + Appium

Projeto de automação de testes mobile desenvolvido em **JavaScript**, utilizando **WebdriverIO**, **Appium** e **Mocha**, como parte de um **desafio técnico de QA Mobile**.

O objetivo do projeto é validar fluxos críticos da aplicação Android, seguindo **boas práticas de automação**, **Page Objects**, **organização de código** e **integração com CI/CD (GitHub Actions)**.

---

## 🎯 Objetivos do Projeto

- Automatizar fluxos principais da aplicação mobile
- Validar mensagens, navegação e interações do usuário
- Garantir manutenibilidade usando **Page Objects**
- Gerar evidências (screenshots e relatórios)
- Executar testes automaticamente via **CI/CD**

---

## 🛠 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js)
- **Framework de Automação:** WebdriverIO
- **Automação Mobile:** Appium
- **Plataforma:** Android
- **Gerenciador de Testes:** Mocha
- **Asserts:** Chai
- **Relatórios:** Allure Report
- **CI/CD:** GitHub Actions
- **Controle de Versão:**   GIT


---


## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

### 💻 Sistema Operacional
- Windows 10 ou Windows 11

### 🔧 Ferramentas
- **Node.js** (versão LTS recomendada)
- **Java JDK 11+**
- **Android Studio**
- **Android SDK configurado**
- **Emulador Android criado e funcional**
- **GIT**

---

## 🔌 Configuração do Ambiente

### 1️⃣ Clonar o repositório

bash
git clone https://github.com/danylolopes/qa-mobile-project.git

cd qa-mobile-project

---



2️⃣ Instalar dependências - 
npm install

3️⃣ Verificar o Emulador Android

Abrir o Android Studio

Iniciar um emulador Android

Confirmar que o dispositivo aparece:

adb devices

4️⃣ APK da Aplicação

⚠️ O APK não é versionado no Git devido à limitação de tamanho do GitHub.

Coloque o APK manualmente no diretório:

apps/


E confirme que o caminho está configurado corretamente no wdio.conf.js:

'appium:app': './apps/android.wdio.native.app.v2.0.0.apk'

▶️ Execução dos Testes
Executar todos os testes
npx wdio run wdio.conf.js

Executar um teste específico
npx wdio run wdio.conf.js --spec test/specs/login.spec.js

📸 Evidências (Screenshots)

Screenshots são capturados automaticamente durante a execução

Os arquivos são salvos na pasta:

screenshots/


Essas evidências podem ser utilizadas para análise de falhas e auditoria dos testes.

📊 Relatórios –  Allure
Gerar relatório
npx allure generate allure-results --clean

Abrir relatório
npx allure open

🔁 CI/CD – GitHub Actions

O projeto possui pipeline configurada via GitHub Actions.

📍 Local da pipeline
.github/workflows/mobile-tests.yml

📌 O que a pipeline faz:

Executa a instalação das dependências

Valida o projeto automaticamente a cada push

Garante que os testes estão corretamente configurados

⚠️ Observação:
Testes mobile com Appium dependem de emulador físico ou virtual, portanto a pipeline valida estrutura, dependências e execução do projeto, mas a execução completa dos testes requer ambiente Android disponível.

🧠 Boas Práticas Aplicadas

Page Object Model (POM)

Separação clara de responsabilidades

Testes independentes

Código legível e comentado

Pipeline CI/CD versionada

Exclusão de arquivos pesados (node_modules, APK)

---

📌 Observações Finais

Este projeto foi desenvolvido com foco em qualidade, organização, e padrões profissionais de QA Mobile, atendendo aos requisitos solicitados no desafio técnico.

---
# Estrutura do projeto

```
qa-mobile-project/
├── .github/
│   └── workflows/
│       └── mobile-tests.yml
│
├── test/
│   ├── pageobjects/
│   │   ├── auth.page.js
│   │   ├── forms.page.js
│   │   └── webview.page.js
│   │
│   ├── specs/
│   │   ├── login.spec.js
│   │   ├── forms.spec.js
│   │   ├── error_messages.spec.js
│   │   └── navigation.e2e.spec.js
│
├── screenshots/
├── allure-results/
├── apps/
│
├── .gitignore
├── package.json
├── package-lock.json
├── wdio.conf.js
└── README.md


