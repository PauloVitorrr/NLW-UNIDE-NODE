import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { errorHandler } from "./error.handler";

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description:
        "Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
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

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTION...

// CORPO DA REQUISIÇÃO (REQUEST BODY)
//PARAMENTROS DE BUSCA (SEARCH PARAMS/ QUERY PARAMS) `http://localhost:3333/users?name=Diego`
//PARAMETROS DE ROTA (Route Params) -> Identificação de recursos `DELETE http://localhost:3333/users/5`
//CABEÇALHOS(HEADERS) -> contexto

//SEMANTICAS = SIGNIFICADO

//Driver nativo / Query Builders / ORMs

// 200 => Sucesso
// 300 => redirecionamento
// 400 => erro do cliente (Erro em alguma informação enviada por quem está fazendo a chama p/ API)
// 500 => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo eviado p/ o servidor)
