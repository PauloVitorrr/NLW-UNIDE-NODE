import { FastifyInstance } from "fastify";
import { BadResquest } from "./routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  const { validation, validationContext } = error;

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validation",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadResquest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "internal server error!" });
};
