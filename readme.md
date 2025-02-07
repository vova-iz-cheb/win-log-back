1. устанавливаем mongo https://www.mongodb.com/docs/manual/installation/
2. создаем .env

```
PORT=3000
MONGODB=mongodb://127.0.0.1:27017/myNewDatabase # local
BCRYPT_SALT=10
REGISTER_JWT_SECRET=i_am_so_beaty
APP_JWT_SECRET=go_dance_baby

SENDER_EMAIL=******@gmail.com (свое или спросить у Вовы)
SENDER_EMAIL_PASSWORD='********'

VERIFY_URL=https://win-log-back.onrender.com/verify # deployed on RENDER
# VERIFY_URL=http://localhost:3000/verify # local
```

3. переключаемся на новый node ( иначе ошибка ) nvm use 23.6 (Fastify v5 will only support Node.js v20+ because it has significant differences compared to v18, such as better support for node:test. This allows us to provide a better developer experience and streamline maintenance.
   Node.js v18 will exit Long Term Support on April 30, 2025, so you should be planning to upgrade to v20 anyway.)
4. запускаем сервер npm start

deploy

1. создать акк на https://cloud.mongodb.com/
2. Network Access 0.0.0.0/0 чтобы проверить (TODO:ПОТОМ УБРАТЬ!)
3. подключиться к базе (see login/pass cluster - connect - drivers)

```
MONGODB='mongodb+srv://login:pass@cluster0.v9nhz.mongodb.net/myNewDatabase?retryWrites=true&w=majority&appName=Cluster0'
# MONGODB1=mongodb://127.0.0.1:27017/myNewDatabase
```

4. use RENDER to deploy your backend https://win-log-back.onrender.com
