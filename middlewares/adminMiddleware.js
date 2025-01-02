const authMiddleware = require('./authMiddleware');

const adminMiddleware = async (req, res, next) => {
  try {
    
    await authMiddleware(req, res, () => {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
      next();
    });
  } catch (error) {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = adminMiddleware;
