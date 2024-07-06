import express from 'express'
const app = express()
const PORT = 3000

app.use(express.json())
let taskList = []
let nextId = 1

app.get('/tasks', (req, res) => {
    res.status(200).json(taskList)
})

app.get('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId)
    const task = taskList.find(task => task.id === taskId)

    if (!task) {
        res.status(404).json({ error: 'Task not found' })
    } else {
        res.status(200).json(task)
    }
})