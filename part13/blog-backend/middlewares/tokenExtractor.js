const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {  
    const authorization = req.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
      try {      
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)    
      } catch{      
        return res.status(401).json({ error: 'Invalid token' })    
      }  
    }  else {    
      return res.status(401).json({ error: 'Missing token' })  
    }  next()
}

module.exports = { tokenExtractor }