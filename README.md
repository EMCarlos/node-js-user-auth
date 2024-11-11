# Node.js User Authentication

This repository contains a Node.js application that demonstrates user authentication. It includes features such as user registration, login, and session management with cookies. The application uses Express.js for the server framework, DBLocal for the database, and jsonwebtoken for authentication.

Created from:
[Aprende Autenticación de Usuario, Sesión, Cookies y JWT con Node.js - Midudev](https://www.youtube.com/watch?v=UqnnhAZxRac)

## Features

- User Registration
- User Login
- Session Management
- Password Hashing
- Input Validation

## Technologies Used

- Node.js
- Express.js
- DBLocal
- jsonwebtoken
- Mongoose
- bcrypt
- ejs
- cookie-parser

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/EMCarlos/node-js-user-auth.git
   ```
2. Install dependencies:
   ```sh
   cd node-js-user-auth
   pnpm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=your_favorite_local_port
   SALT_ROUNDS=your_jwt_salt_rounds
   SECRET_JWT_KEY=your_session_secret
   ```
4. Start the application:
   ```sh
   node --watch index.js
   ```

## Usage

- Register and login an user by navigating to `/`.
- Access protected routes after logging in.

## License

This project is licensed under the MIT License.
