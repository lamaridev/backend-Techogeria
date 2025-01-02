const express = require('express');
const connectDB = require('./config/db');
const phoneRoutes = require('./routes/phoneRoutes');
const userRoutes = require('./routes/userRoutes');
const phoneForSale = require('./routes/phoneForSaleRoutes');
const codeTrack = require('./routes/CodeTrackRoutes');
const cors = require('cors');
require('dotenv').config();




const app = express();



app.use(cors({ origin: '*' }));
app.use(express.json());




connectDB();


app.get('/', (req, res) => {
  res.send('Hi');
});



app.use('/api/users', userRoutes);
app.use('/api/phones', phoneRoutes);
app.use("/api/phoneForSale", phoneForSale);
app.use("/api/codeTrack", codeTrack);

app.post('/api/verify-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate the token
      res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  });
  

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
