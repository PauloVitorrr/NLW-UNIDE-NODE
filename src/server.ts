import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTION...

// CORPO DA REQUISIÇÃO (REQUEST BODY)
//PARAMENTROS DE BUSCA (SEARCH PARAMS/ QUERY PARAMS) `http://localhost:3333/users?name=Diego`
//PARAMETROS DE ROTA (Route Params) -> Identificação de recursos `DELETE http://localhost:3333/users/5`
//CABEÇALHOS(HEADERS) -> contexto

//SEMANTICAS = SIGNIFICADO

//Driver nativo / Query Builders / ORMs

const app = fastify();

app.post("/events", async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });
  const data = createEventSchema.parse(request.body);

  const event = await prisma.event.create({
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug: new Date().toISOString(),
    },
  });

  return reply.status(2001).send({ eventId: event.id });
});

app.listen({ port: 3333 }).then(() => {
  console.log("http server running!");
});
