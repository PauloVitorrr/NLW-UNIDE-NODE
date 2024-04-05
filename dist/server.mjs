import {
  registerForEvent
} from "./chunk-ROBKFTJY.mjs";
import {
  errorHandler
} from "./chunk-BH3LIZ2R.mjs";
import {
  checkIn
} from "./chunk-RSH6FAD6.mjs";
import {
  createEvent
} from "./chunk-YDAN6OHT.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-J2FNR2E5.mjs";
import {
  getEventAttendees
} from "./chunk-KWXETATN.mjs";
import {
  getEvent
} from "./chunk-LVQ43YNG.mjs";
import "./chunk-3N6WEW4Y.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
var app = fastify();
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333 }).then(() => {
  console.log("http server running!");
});
