Episode-09 | Encrypting Passwords
-Making a validator funtion (Helper function)for stictly validate post APIs 
-create Util folder and create validate.js 
-worte funtion for validate 
-import to app.js and pass the req.body

=>Password encryptt
=>for validate data in signup api
=>NPM i bcrypt 
=> Create password hash
=>Save all to DB

=>Create login API(with logic)
=>Compare password and throw erroe if email or password invalid

=>res.cookies("token","secretket123")
=>npm i npm i cookie-parser
=>app.use(cookieParser())
=>print cookie.token
=>npm i jwt
=>token =jwt.sign()
=>jwt.verify() 