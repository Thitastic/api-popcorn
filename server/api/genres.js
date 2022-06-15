const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/:id', async (req, res)=>{
    res.send(await findGenre(req.params.id))
} )

router.get('/', async (req, res)=>{
    res.send(await getAll())
} )


async function findGenre(id){
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
        const genre = client.db('popcorn-collections').collection('popcorn_genre')
        return genre.find({_id: mongodb.ObjectId(id)}).toArray()
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
        const el = client.db('popcorn-collections').collection('popcorn_genre')
        return el.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
}

module.exports =  router