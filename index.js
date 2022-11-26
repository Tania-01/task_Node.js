const express = require('express')
const getFakeUsers = require('get-fake-user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const axios = require('axios')
 
const config = require('./config')

const routerNotes = require('./routerNotes')
const routerUsers = require('./routerUser')



const Users = require('./models/Users')
const CoinList = require('./models/CoinList')

let createUsersPage = async () => {
    let usersList = await Users.find(
        {},
        {login:1}
    ).lean()
    for(let i=0;i<=usersList.length-1;i++){
        app.get(`/user/${usersList[i].login}`, (req,res)=>{
            res.sendFile(__dirname+'/userPage.html')
        })
    }
}
const corsConfig = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus:200
}

app.use(cors(corsConfig))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/public', express.static(__dirname+'/Static'))

app.get('/', (req,res) => {
  res.sendFile(__dirname+'/mainPage.html')
})

app.post('/create-users', (req,res) => {
    let countUsers = req.body.countUsers
    res.status(200).json(
        getFakeUsers({count:countUsers})
    )
})

app.use('/notes', routerNotes)
app.use('/users-api', routerUsers)

//app.post('/users-list', ())
const deleteAllSession = async() => {
    setInterval(async()=>{
        console.log("Reset session")
       await UsersHash.updateMany(
        {},
        {
            session: null
        }
        )
    },1800000)
}

mongoose.connect(config.MongoApi)
    .then(()=>{
        console.log('MongoDB connected')
        deleteAllSession()
        createUsersPage()
        }
    )
    .catch(err => console.log(err))

const io = new Server(server)
io.sockets.on('connection', (socket)=>{
    console.log('User connected')
    socket.on('get-list', async (res) =>{
        
        
        res.map((coin) => {
            new CoinList({
                coinName: coin.name, 
                costUSD: coin.data_symbols_count,
                data: {
                    start: coin.data_start,
                    end: coin.data_end
                }
            }).save()
        })
        let listCoin = await CoinList.find({},{coinName:1,costUSD:1,data:1})
        io.sockets.emit('push-list', listCoin)
    })
    socket.on('disconnect', async()=> {
        console.log('User disconnect')
        await CoinList.deleteMany({})
    })

})

server.listen(config.Port, ()=>{
    console.log(`Server started on ${config.Port} port`)
})