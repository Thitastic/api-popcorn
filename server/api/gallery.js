const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

router.get('/:user_id', async (req, res)=>{
    res.send(await getByUser(req.params.user_id))
} )

router.post('/new', async (req, res)=>{
    res.send(await addNewGallery(req.body.item))
} )


router.delete('/destroy/:id', async (req, res)=>{
    res.send(await deleteGallery(req.params.id))
} )



async function getByUser(userId){
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
        const gallery = client.db('popcorn-collections').collection('popcorn_gallery')
        return gallery.find({_user_id: mongodb.ObjectId(userId)}).toArray()
    } catch (error) {
        console.log(error)
    }
}

async function addNewGallery(item){
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
        const gallery = client.db('popcorn-collections').collection('popcorn_gallery')
        gallery.insertOne(
            {
                _user_id:  mongodb.ObjectId(item._user_id),
                _movie: item._movie
            }
        )
    } catch (error) {
        console.log(error)
    }
}


async function deleteGallery(id){
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
        const gallery = client.db('popcorn-collections').collection('popcorn_gallery')
        gallery.deleteOne(
            {
                _id : mongodb.ObjectId(id)
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports =  router