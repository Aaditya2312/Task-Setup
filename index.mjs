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

app.post('/tasks', (req, res) => {
    const { name, about } = req.body

    if (!name || !about) {
        res.status.apply(404).json({ error: 'Title and description are required' })
    } else {
        const newTask = {
            id: nextId++,
            name,
            about
        }
        taskList.push(newTask)
        res.status(201).json(newTask)
    }
})

app.put('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId)
    const taskIndex = taskList.findIndex(task => task.id === taskId)

    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' })
    } else {
        const { name, about } = req.body

        if (!name || !about) {
            res.status(400).json({ error: 'name and about not given' })
        } else {
            taskList[taskIndex] = { id: taskId, name, about }
            res.status(200).json(taskList[taskIndex])
        }
    }
})

app.delete('/tasks/:taskId', (req, res) => {
    const taskId = Number(req.params.taskId)
    const taskIndex = taskList.findIndex(task => task.id === taskId)

    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' })
    } else {
        taskList.splice(taskIndex, 1)
        res.status(204).send(taskList)
    }
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Task Manager API is running on http://localhost:${PORT}`);
});