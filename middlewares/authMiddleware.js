const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = authMiddleware;
