const express = require('express');

const app = express();

const PORT = 3001;

const {reader, writer} = require("./fs.service");

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})


app.get('/users', async (req, res) => {
    const users = await reader();
    res.json(users)
})

// app.get('/users/:userId', (req, res)=>{
//   const {userId} = req.params
//
//   const user = users[+userId-1]
//
//   res.json(user)
// })
//
app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body

    const users = await reader();

    const newUser = {
        id: users[users.length - 1]?.id + 1 || 1,
        name,
        age,
        gender
    }
    users.push(newUser)

    await writer(users)


    res.status(201).json({
        message: 'User created!'
    })

})