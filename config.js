export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY = 'this-is-an-awesome-secret-key' // Se usa aca porque no lo vamos a subir a produccion, sino deberia ir en variable de entorno SI O SI
} = process.env
