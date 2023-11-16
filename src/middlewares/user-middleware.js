import express from "express";
import jwt from "jsonwebtoken";

const userMiddleware = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    response.status(403).send();
  } else {
    const [, token] = authorization.trim().split(" ");

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (verified) {
        next();
      } else {
        response.status(403).send();
      }
    } catch (error) {
      response.status(403).send();
    }
  }
};

export default userMiddleware;
