const getProfile = (req, res) => {
  const userId = req.user;

  const userData = {
    id: userId,name: 'Ali',email: 'ali@example.com'
  };
  res.json({
    success: true,
    data: userData
  });
};

module.exports = {
  getProfile,
};