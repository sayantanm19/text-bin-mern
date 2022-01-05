import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.header('Authorization');
  if (typeof header !== 'undefined') {

    // Get the token from the second index
    // of the header
    const token = header.split(' ')[1];

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
      
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }
  else {
    return res.status(401).send('Access Denied');
  }
}