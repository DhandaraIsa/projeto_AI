# Assistente de Meta 🎮🤖

Aplicação web que funciona como um **assistente de meta** para jogos (ex: Valorant, LoL, CS, GTA), permitindo que o usuário selecione o jogo, faça uma pergunta e receba uma resposta gerada por IA usando a **API do Google Gemini**.

A resposta vem em **Markdown** e é renderizada no navegador em **HTML** com a biblioteca **Showdown**.

---

## ✨ Funcionalidades

- Seleção do jogo (Valorant, League of Legends, Counter-Strike, GTA)
- Campo para inserir a **API Key do Gemini**
- Campo para pergunta do usuário
- Chamada à API do **Gemini** usando `fetch()`
- Resposta formatada em **Markdown**
- Conversão do Markdown para HTML com **Showdown**
- Estado de carregamento no botão (disabled + animação)

---

## 🧩 Tecnologias

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **Google Gemini API** (via HTTP)
- **Showdown** (Markdown ➜ HTML)

---

## 📁 Estrutura recomendada

/assistente-meta
├── index.html
├── style.css
├── script.js
└── assets/
├── logo.png
└── bg.jpg



---

## ▶️ Como executar

### Opção 1 — Abrir direto
Abra o arquivo `index.html` no navegador.

> Se você tiver problemas com caminhos de imagem (`/assets/...`), use Live Server.

### Opção 2 — Live Server (recomendado)
1. Abra o projeto no VS Code
2. Instale a extensão **Live Server**
3. Clique com o botão direito em `index.html`
4. Escolha **Open with Live Server**

---

## 🔑 Como usar (passo a passo)

1. Abra a página
2. Cole sua **API Key do Gemini** no campo “Informe a API KEY do GEMINI”
3. Selecione um jogo
4. Digite sua pergunta (ex: *Melhor build para ADC...*)
5. Clique em **Perguntar**
6. A resposta aparecerá no card abaixo, formatada em Markdown

---

## ⚙️ Como funciona por baixo dos panos

- O formulário dispara `EnviarFormulario()`
- O script valida se os campos estão preenchidos
- O botão entra em modo loading (texto “Enviando...”)
- A função `PerguntarAI()`:
  - monta o prompt com regras e contexto do jogo
  - chama o endpoint do Gemini:
    ```
    https://generativelanguage.googleapis.com/v1beta/models/<MODEL>:generateContent?key=<API_KEY>
    ```
  - retorna o texto da IA
- A resposta é convertida de Markdown para HTML com:
  - `showdown.Converter().makeHtml(text)`
- A resposta é inserida no `#aiResponse .response-content`

---

## 🛡️ Segurança (importante)

Este projeto recebe a API Key pelo front-end.
✅ Bom para estudos e protótipos.  
⚠️ **Não recomendado para produção**, porque a chave pode ficar exposta.

**Recomendado para produção:** colocar a chamada da API em um backend (Node, Python etc).

---

## 🛠️ Ajustes recomendados (CSS)

No seu `style.css`, existem dois pontos que podem ser corrigidos:

1) Em `section`, o `border` está com vírgula:
- Atual:
  ```css
  border: 0,625rem;
