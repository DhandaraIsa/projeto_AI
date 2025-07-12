const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownTOHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const PerguntarAI = async( apiKey, game, question) => {
const model = "gemini-2.5-pro"
const geminiURL= `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
const pergunta = ` ##Especialidade você é um especialista no jogo ${game}, responda a pergunta de forma detalhada e completa, com o máximo de informações possíveis. Pergunta: ${question}
##Tarafe Você deve responder a pergunta de forma detalhada e completa, com o máximo de informações possíveis. Se não souber a resposta, diga que não sabe.
##Regras Você deve seguir todas as regras e diretrizes estabelecidas para a sua resposta. Não se desvie do assunto e forneça informações precisas e relevantes considere data atual ${new Date().toLocaleDateString()}
## Resposta economize na resposta, seja breve e direto ao ponto, mas ainda assim forneça informações úteis e relevantes. Evite divagações e mantenha o foco na pergunta feita.
#Exemplo de resposta: Qual é a melhor build para ADC no League of Legends? resposta: a build mais atual é \n\n **itens:** \n\n coloque aqui os itens recomendados \n\n **runas:** \n\n coloque aqui as runas recomendadas \n\n **habilidades:** \n\n coloque aqui as habilidades recomendadas \n\n **estratégia:** \n\n coloque aqui a estratégia recomendada para o jogo. \n\n **dicas:** \n\n coloque aqui as dicas adicionais para o jogo.
coloque em Markdown e não coloque o nome do jogo no início da resposta, apenas coloque o nome do jogo no início da resposta se for necessário para a pergunta.

---
Aqui está a pergunta do usuário: ${question}`

const contents = [{
    role: 'user',
    parts: [{
        text: pergunta
    }]
}]
    const tools = [{
        google_search: {}
    }]


const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents,
        tools
    })    
        
    })

    const data = await response.json()
    return data.candidates [0].content.parts[0].text


}

const EnviarFormulario = async(event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

  

    if(apiKey == '' || game == '' || question == '') {
        alert ('Por favor, preencha todos os campos')
        return
    }
    askButton.disabled = true
    askButton.textContent = 'Enviando...'   
    askButton.classList.add('Loading')

    try {
        // Perguntar para IA
      const text = await PerguntarAI(apiKey, game, question)
      aiResponse.querySelector('.response-content').innerHTML = markdownTOHTML(text)

    } catch (error) {
      console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = 'Perguntar'
        askButton.classList.remove('Loading')

    } 
    



}
form.addEventListener('submit', EnviarFormulario)
