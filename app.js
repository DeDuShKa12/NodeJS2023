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

// app.get('/users/:userId', async (req, res) => {
//     const {userId} = req.params
//
//     const users = await reader();
//     if (users[userId]) {
//         const userById = users[userId-1]
//         res.json(userById)
//     }
//     else if (!users[userId]) {
//         res.status(400).json({
//             message: 'User is not detected'
//         })
//     }
// })

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await reader();

    const user = users.find((user) => user.id === +userId);

    if (!user) {
        res.status(400).json(`User with id ${userId} not found`)

    }
    res.json(user)
})

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body

    if (!name || name.length < 2) {
        res.status(400).json({
            message: 'Name Wrong'
        })
    }
    if (!age || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json({
            message: 'Age Wrong'
        })
    }
    if (!gender || (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
        res.status(400).json({
            message: 'Gender Wrong'
        })
    }

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

app.patch('/users/:userId', async (req, res)=>{
    const { userId } = req.params;

    const {name, age, gender} = req.body;

    if (name && name.length < 2) {
        res.status(400).json({
            message: 'Name Wrong'
        })
    }
    if (age && !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json({
            message: 'Age Wrong'
        })
    }
    if (gender && (gender !== 'male' && gender !== 'female' && gender !== 'mixed')) {
        res.status(400).json({
            message: 'Gender Wrong'
        })
    }

    const users = await reader();

    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        res.status(400).json(`User with id ${userId} not found`)

    }
    users[index]={...users[index],...req.body}


    await writer(users)

    res.status(201).json(users[index])

})

app.delete('/users/:userId', async (req, res)=>{
    const { userId } = req.params;

    const users = await reader();
    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        res.status(400).json(`User with id ${userId} not found`)

    }

    users.splice(index, 1);

    await writer(users)

    res.sendStatus(204)
})