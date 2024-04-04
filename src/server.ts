import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);

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
