import express from 'express'
import { PORT,mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import exerciseRoutes from './routes/exerciseRoutes.js'
import cors from 'cors'


const app=express()

app.use(express.json())

app.use(cors())

// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

app.use('/new',exerciseRoutes)

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database")
    app.listen(PORT ,()=>{
        console.log(`App is listening to port ${PORT}`)
    })
})

.catch((error)=>{
    console.log(error)
})