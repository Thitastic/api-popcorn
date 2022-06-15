const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()


const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/g/:genre', async (req, res)=>{
    res.send(await findGenre(req.params.genre))
} )


router.get('/trending/:limit', async (req, res)=>{
    res.send(await getTrending(req.params.limit))
} )

router.get('/watch/:id', async (req, res)=>{
    res.send(await findId(req.params.id))
})

router.get('/type/:name',async (req, res)=>{
    res.send(await findType(req.params.name))
})

router.get('/search/:key',async (req, res)=>{
    res.send(await search(req.params.key))
})

router.post('/update/', (req,res)=>{
    res.send(req.params.body)
})


async function findGenre(genre){
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
        const genres = client.db('popcorn-collections').collection('popcorn_genre')
        const movies = client.db('popcorn-collections').collection('popcorn_movies')
        const genre_id = await genres.find({_name: genre}).toArray()
        return movies.find({$or:[{"_genre.a" : genre_id[0]._id}, {"_genre.b" : genre_id[0]._id}, {"_genre.c" : genre_id[0]._id}]}).toArray()
    } catch (error) {
        console.log(error)
    }
}

async function getTrending(limit){
    try {
        const _limit = parseInt(limit)
        const client = await new mongodb.MongoClient
        (
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const movies = client.db('popcorn-collections').collection('popcorn_movies')
        return movies.find({}, {_weekly_view: 1}).sort({_weekly_view: -1}).limit(_limit).toArray()
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
        const movie = client.db('popcorn-collections').collection('popcorn_movies')
        return movie.find({_id: mongodb.ObjectId(id)}).toArray()
    } catch (error) {
        console.log(error)
    }
}

async function findType(typeName){
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
        const movie = client.db('popcorn-collections').collection('popcorn_movies')
        return movie.find({_type: typeName}).toArray()
    } catch (error) {
        console.log(error)
    }
}

async function search(key){
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
        const movie = client.db('popcorn-collections').collection('popcorn_movies')
        return movie.find({
            $or:[
                {_name: {$regex: key, $options: "i"}},
                {_desc: {$regex: key, $options: "i"}}
            ]
        }).toArray()
    } catch (error) {
        console.log(error)
    }
}

module.exports = router