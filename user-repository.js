import bcrypt from 'bcrypt'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    // 3. ASEGURARSE DE QUE EL USUARIO NO EXISTA
    const user = User.findOne({ username })
    if (user) throw new Error('user already exists')
    const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS)

    const id = crypto.randomUUID()

    // 4. CREAR USUARIO
    User.create({ _id: id, username, password: hashedPassword }).save()

    return id
  }

  static async login ({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('user not found')

    const isValid = await bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('invalid password')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('username must be a string')
    if (username.length < 3) throw new Error('username must be at least 3 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('password must be a string')
    if (password.length < 8) throw new Error('password must be at least 8 characters long')
  }
}
