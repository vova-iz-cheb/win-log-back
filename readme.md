1. устанавливаем mongo https://www.mongodb.com/docs/manual/installation/
2. создаем .env

```
PORT=3000
MONGODB=mongodb://127.0.0.1:27017/myNewDatabase
BCRYPT_SALT=10
REGISTER_JWT_SECRET=i_am_so_beaty
APP_JWT_SECRET=go_dance_baby

SENDER_EMAIL=******@gmail.com (свое или спросить у Вовы)
SENDER_EMAIL_PASSWORD='********'

VERIFY_URL=http://localhost:3000/verify
```

3. переключаемся на новый node ( иначе ошибка ) nvm use 23.6 (Fastify v5 will only support Node.js v20+ because it has significant differences compared to v18, such as better support for node:test. This allows us to provide a better developer experience and streamline maintenance.
   Node.js v18 will exit Long Term Support on April 30, 2025, so you should be planning to upgrade to v20 anyway.)
4. запускаем сервер npx ts-node server.ts
