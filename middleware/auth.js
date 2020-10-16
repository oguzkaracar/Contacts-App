// bu middleware ile req ve response cycle'a erişim sağlayarak req ve res. objelerindeki headerlar da token olup olmadığına bakarak, route işlemleri yapıcaz. Böylece protecting route yapmış olucaz...

const jwt = require('jsonwebtoken');
const config = require('config');

// middleware func.
module.exports = function(req,res,next){
    // Gets token from header
    const token = req.header('x-auth-token'); // x-auth-token ==> Token'n header daki ismidir..

    // Check if not token ? 
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));

        req.user = decoded.user; // payloadları değiştiriyoruz. decoded verileri request e aktardık.
        next(); // middleware bitti şimdi devamke...
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'});
    }
}