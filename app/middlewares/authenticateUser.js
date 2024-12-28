const jwt = require('jsonwebtoken')
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) {
        return res.status(400).json({ error: 'token is required'})
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET) 
        req.user = {
            id: tokenData.id,
            role: tokenData.role 
        }
        next()
    } catch(err) {
        return res.status(400).json({ error: err })
    }
}





// //admin acces auth
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) return res.status(401).json({ error: 'Token is required' });

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ error: 'Invalid token' });
//         req.user = user;
//         next();
//     });
// }

module.exports = authenticateUser