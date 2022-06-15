const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//DB Connect infor
const uri = 'mongodb+srv://thitastic:ten96nctu@popcorn-main.5rlgx.mongodb.net/?retryWrites=true&w=majority'

//GET 
router.get('/',async (req, res)=>{
    res.send(await getUsersCollections())
})

//GET by PHONE
router.get('/p/:p', async (req, res)=>{
    res.send(await getUserByPhone(req.params.p))
})

//GET by username
router.get('/username/:u', async (req, res)=>{
    res.send(await getUserByUsername(req.params.u))
})

//GET by token
router.get('/t/:token', async (req, res)=>{
    res.send(await getUserByToken(req.params.token))
})

//POST 

router.post('/update',async (req,res)=>{
    console.log(req.body._object)
    res.send(await update(req.body._id, req.body._object))
})

router.post('/new',async (req, res)=>{
    res.send(await insert(req.body._object))
})

//connect db
//Get all users
async function getUsersCollections(){
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
        const collections = client.db('popcorn-collections').collection('popcorn_users')
        return collections.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
}
//Search by phone
async function getUserByPhone(phone){
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
        const users = client.db('popcorn-collections').collection('popcorn_users')
        return users.find({_phone: phone}).toArray()
    } catch (error) {
        console.log(error)
    }
}

//Search by username
async function getUserByUsername(username){
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
        const users = client.db('popcorn-collections').collection('popcorn_users')
        return users.find({_username: username}).toArray()
    } catch (error) {
        console.log(error)
    }
}

//Search by tokrn
async function getUserByToken(token){
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
        const users = client.db('popcorn-collections').collection('popcorn_users')
        return users.find({_token: token}).toArray()
    } catch (error) {
        console.log(error)
    }
}



//Update user
async function update(id, object){
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
        const users = client.db('popcorn-collections').collection('popcorn_users')
        users.updateOne(
            {_id: mongodb.ObjectId(id)},
            {
                $set:
                {
                    _username: object[0]._username,
                    _phone: object[0]._phone,
                    _premium_outdate: object[0]._premium_outdate,
                    _token: object[0]._token
                }
            }
        )
        console.log(object[0]._token)
    } catch (error) {
        console.log(error)
    }
}

//Insert
async function insert(object){
    try{
        const client = await new mongodb.MongoClient
        (
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        await client.connect()
        const users = client.db('popcorn-collections').collection('popcorn_users')
        users.insertOne(
            {
                _username: object._username,
                _phone: object._phone,
                _premium_outdate: object._premium_outdate,
                _token: object._token
            }
        )
    }
    catch(error){
        console.log(error)
    }
}

module.exports = router