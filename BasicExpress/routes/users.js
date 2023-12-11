
const express = require('express')
const router = express.Router()


const users = [{name:"Surya"}, {name:"saro"}]


router.get("/userlist", (req,res) => {
    res.send("Userlist")
}
)

router.get("/new",(req,res) =>
{
    res.send("User New Form")
})

router.post('/', (req,res) =>
{
    res.send('create User')
}
)

router.route('/:id') // URL Binding 
.get((req,res) => 
{
    console.log(req.user)
    res.send(`Get User with ID ${req.user}`);
})
.put((req,res)=>
{
    res.send(` Update User with ID ${req.params.id}`)
})
.delete((req,res) =>
{
    res.send(`Delete User ${req.params.id}`)
}
)
router.param("id",(req,res,next,id)=>
{
    req.user = users[id].name
    next()
}
)
module.exports = router;