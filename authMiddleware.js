// authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      console.log('Decoded JWT:', decoded); // Log the decoded JWT here
      req.user = decoded;  // Attach decoded data to req.user
      console.log('req.user in middleware:', req.user);  // Log req.user here to verify
      next();
  } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateUser;
