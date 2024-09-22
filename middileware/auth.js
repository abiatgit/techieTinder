

function isAuth(token) {
    if (token === 123) {
      return true;
    }
  }
  
const adminAuth=(req, res, next) => {
    console.log("admin auth checking");
    let token = 123;
    let admin = isAuth(token);
    if (!admin) {
      console.log("you are not Admin");
      res.status(404).send("sorry unotherized admin");
    } else {
      console.log("admin ok ok to route handlers");
      next();
    }
  }

const userAuth=(req, res, next) => {
    console.log("user auth checking");
    let token = 125;
    let admin = isAuth(token);
    if (!admin) {
      console.log("you are not User");
      res.status(404).send("sorry unotherized User");
    } else {
      console.log("User ok ok to route handlers");
      next();
    }
  }

  module.exports={adminAuth,userAuth}