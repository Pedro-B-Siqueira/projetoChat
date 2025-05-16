
// elementos de login
const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

//elementos do chat
const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")

const user = { id: "", name: "", color: "" }
const colors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "beige",
    "biscuit",
    "blue",
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


const colorPicker = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault() // impede a att da página ao enviar o formulario

    user.id = crypto.randomUUID() //gera um id random pro user
    user.name = loginInput.value
    user.color = colorPicker()


    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onopen = () => 
        websocket.send(`Usuário: ${user.name} entrou no chat!`)
        console.error(this)

    
    
    console.log(user)
})

chatForm.addEventListener("submit", (event) => {
    event.preventDefault()
})
