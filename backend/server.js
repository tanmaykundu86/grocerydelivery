import { app } from './app.js'
import { mongoDB } from './database/database.js';
import { config } from 'dotenv';

//---> setting up .env file by importing config from dotenv
//Note: we are not giving path as this file is in root directory. So we can directly call this
//if in different folder then give path as config({path:'./folderName/config.env'}) 
config();

//calling this func to connect the database
mongoDB();

//using this to start the server, server will listen/handles all the requests
app.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err, addr) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
    }
})

app.ready().then(() => {
    app.io.on('connection', (socket) => {
        console.log("A User Connected")
        socket.on("joinRoom", (orderId) => {
            socket.join(orderId);
            console.log(`User joined room ${ orderId } `);
        })
        socket.on('disconnect', ()=>{
            console.log("User Disconnected")
        })
    })
})