const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/build/:name', async (req, res)=>{
    res.send(await findName(req.params.name))
} )


async function findName(name){
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
        const el = client.db('popcorn-collections').collection('popcorn_el')
        return el.find({_name: name}).toArray()
    } catch (error) {
        console.log(error)
    }
}

module.exports =  router