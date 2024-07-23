import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if token is close to expiration (e.g., within 5 minutes)
    const now = Date.now() / 1000; // Current time in seconds
    const timeLeft = decoded.exp - now;

    if (timeLeft < 300) {
      // Less than 5 minutes
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.setHeader("x-new-token", newToken);
    }

    req.user = decoded;
    next();
  });
};
