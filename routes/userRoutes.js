const express = require('express');
const router = express.Router();
const { registerUser, loginUser, editUser, deleteUser } = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleware');




router.post('/register', registerUser);

router.post('/login', loginUser);


router.put('/edit/:id', editUser);


router.delete('/delete/:id', deleteUser);

module.exports = router;
