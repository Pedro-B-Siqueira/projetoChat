const { WebSocketServer } = require('ws');
const dotenv = require('dotenv'); // variavel de ambiente

dotenv.config();

const wss = new WebSocketServer({ port: process.env.WS_PORT || 8080 }); // Servidor WebSocket com porta definida em variavel de ambiente

//evento de conexão
wss.on('connection', (ws) => { // parametro da função recebe o cliente que está se conectando
    ws.on("error", console.error) //ou, ws.on("error", (err)  => console.error(err))

    ws.on("message", (data) => {
        console.log(data.toString())
        wss.clients.forEach((client) => client.send(data.toString)) //o atributo client pega todos os clientes conectados no servidor e envia o 
                                                                    // dado da mensagem para todos convertido em string

    }) //função disparada quando alguma mensagem é disparada pro servidor, data é o parametro que recebe o conteudo da mensagem

    console.log("Novo cliente conectado")
})