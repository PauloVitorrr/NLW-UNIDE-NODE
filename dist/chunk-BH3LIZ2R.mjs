import {
  BadResquest
} from "./chunk-3N6WEW4Y.mjs";

// src/error.handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  const { validation, validationContext } = error;
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadResquest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "internal server error!" });
};

export {
  errorHandler
};
