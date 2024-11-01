import express from 'express'
import { Exercise } from '../models/exercise.js'


const router = express.Router()

router.post('/', async(req,res)=>{
    try{
       if( 
        !req.body.title ||
        !req.body.load ||
        !req.body.reps
       ) {
        return res.status(400).send({
            message:"send all required fields"
        })
      
       }
       const newExercise={
        title: req.body.title,
        load: req.body.load,
        reps: req.body.reps,
    }
       const exercise=await Exercise.create(newExercise)

       return res.status(201).send(exercise)
    }catch (err) {
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

router.get('/',async(req,res)=>{
    try{
        const exercise=await Exercise.find({})
        return res.status(200).json({
            count:exercise.length,
            data:exercise
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const exercise=await Exercise.findById(id)
        return res.status(200).json(exercise)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const result=await Exercise.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message:'not fount'})
        }

        return res.status(200).send({message:'deleted successfully'})
    

    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})

router.put('/:id',async(req,res)=>{
    try{if( 
        !req.body.title ||
        !req.body.load ||
        !req.body.reps
       ) { return res.status(400).send({
        message:"send all required fields"
    })}
    const {id}=req.params

    const result=await Exercise.findByIdAndUpdate(id,req.body )

    if(!result){
        return res.status(404).json({message:'not fount'})
    }

    return res.status(200).send({message:' updated successfully'})

    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message})
    }
})
export default router
