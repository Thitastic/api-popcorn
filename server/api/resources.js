const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()


const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/', async (req, res)=>{
    res.send(await getAllResource())
} )

router.get('/:id', async (req, res)=>{
    res.send(await findId(req.params.id))
} )


router.get('/movie/:id', async (req, res)=>{
    res.send(await findMovie(req.params.id))
} )

async function getAllResource(){
    try {
        const client = await new mongodb.MongoClient
        (
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const collections = client.db('popcorn-collections').collection('popcorn_movies_resource')
        return collections.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
}


async function findId(id){
    try {
        const client = await new mongodb.MongoClient
        (
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const collections = client.db('popcorn-collections').collection('popcorn_movies_resource')
        return collections.find({_id: mongodb.ObjectId(id)}).toArray()
    } catch (error) {
        console.log(error)
    }
}


async function findMovie(id){
    try {
        const client = await new mongodb.MongoClient
        (
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const collections = client.db('popcorn-collections').collection('popcorn_movies_resource')
        return collections.find({_movie_id: mongodb.ObjectId(id)}).toArray()
    } catch (error) {
        console.log(error)
    }
}
module.exports = router