const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const app = express()

app.use(express.json())

app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))


const port = process.env.PORT || 5000

async function start() {
    try {
      await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(()=> console.log('MongoDB Connected...'))
      .catch(err => console.log(err))

      app.listen(port, () => console.log(`App has been started on port ${port}...`))
    } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
    }
  }

start()

