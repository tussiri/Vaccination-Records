import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Return an error if no token is found
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user ID to the request object
    req.userId = decoded.id;

    // Call the next middleware function
    next();
  } catch (error) {
    // Return an error if the token is invalid
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { authenticateToken };
