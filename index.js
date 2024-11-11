import cookieParser from 'cookie-parser'
import express from 'express'
import jwt from 'jsonwebtoken'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req?.cookies?.['access-token']
  let decoded = null

  req.session = { user: null }

  try {
    decoded = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = decoded
  } catch {}

  next()
})

app.get('/', (req, res) => {
  const { user } = req.session

  try {
    res.render('index', { ...user })
  } catch (error) {
    res.render('index')
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username }, SECRET_JWT_KEY, {
      expiresIn: '1h'
    })

    res.cookie('access-token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    res.send({ user, token })
  } catch (error) {
    res.status(401).json(error.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  console.log(req.body)

  try {
    const id = await UserRepository.create({ username, password })

    res.send({ id })
  } catch (error) {
    // No es lo mas recomendable, pero para este caso esta bien
    res.status(400).json(error.message)
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access-token').json({ message: 'Logout success' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  console.log(user)

  try {
    res.render('protected', { ...user })
  } catch (error) {
    res.status(400).send('Invalid token')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
