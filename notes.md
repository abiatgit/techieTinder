<!-- Episode-09 | Encrypting Passwords -->
=>making a validator funtion (Helper function)for stictly validate post APIs 
=>create Util folder and create validate.js 
=>worte funtion for validate 
=>import to app.js and pass the req.body
=>Password encryptt
=>for validate data in signup api
=>NPM i bcrypt 
=> Create password hash
=>Save all to DB
=>Create login API(with logic)
=>Compare password and throw erroe if email or password invalid

<!-- Episode 10 | Authenticatiaon, JWT & Cookies -->

=>res.cookies("token","secretket123")
=>npm i npm i cookie-parser
=>app.use(cookieParser())
=>print cookie.token
=>npm i jwt
=>token =jwt.sign()
=>decoded=jwt.verify() 
=>Create Auth middileware
=>add userAuth middileware inprofiele API and a new send connecftion Request API
=>Set the expiry of JWT token and cookies to 7days!

=>createa Userschema method to getJWT()

