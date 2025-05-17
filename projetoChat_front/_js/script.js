
// elementos de login
const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

//elementos do chat
const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")
const chatMessages = document.querySelector(".chat__messages")
const usersNumber = document.querySelector(".users__number")

const user = { id: "", name: "", color: "" }
const colors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "beige",
    "biscuit",
    "lightblue",
    "blueviolet",
    "brown",
    "chartreuse",
    "chocolate",
    "cornflowerblue",
    "darkblue",
    "crimson",
    "darkorange",
    "floralwhite",
    "gold"
]

let websocket

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message__self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message__other")
    span.classList.add("message__sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}


const colorPicker = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const{ userId, userName, userColor, content} = (JSON.parse(data)) //converte de volta em um objeto

    const message = userId == user.id 
        ? createMessageSelfElement(content) 
        : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)
    scrollScreen()
} 

loginForm.addEventListener("submit", (event) => {
    event.preventDefault() // impede a att da página ao enviar o formulario

    user.id = crypto.randomUUID() //gera um id random pro user
    user.name = loginInput.value
    user.color = colorPicker()


    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    // websocket.onopen = () => 
    //     websocket.send(`Usuário: ${user.name} entrou no chat!`)
    websocket.onmessage = processMessage

    // console.log(user)
})

chatForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message)) //converte para string
    chatInput.value = "" //limpa o campo de mensagem após o envio
})
