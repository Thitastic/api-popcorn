const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()


const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/m/:id', async (req, res)=>{
    res.send(await findEposidesOfMovie(req.params.id))
} )

router.get('/', async (req, res)=>{
    res.send(await getAll())
} )

async function findEposidesOfMovie(movieId){
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
        const collections = client.db('popcorn-collections').collection('popcorn_movie_eposides')
        return collections.find({_movie_id: mongodb.ObjectId(movieId)}).toArray()
    } catch (error) {
        console.log(error)
    }
}

async function getAll(){
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
        const collections = client.db('popcorn-collections').collection('popcorn_movie_eposides')
        return collections.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
}
module.exports = router