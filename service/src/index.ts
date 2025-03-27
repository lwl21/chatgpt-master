import express from 'express'
import router from './router'
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.all('*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// app.use(...router)
app.use('', ...router)
app.use('/api', ...router)
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
