exports.addUser = (req, res) => {
    const { username, email, password } = req.body;
  
    console.log('Received user signup:', username, email, password);
  
    res.status(201).json({
      message: 'User signup received successfully',
      user: { username, email }
    });
  };