const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-multipart"));
fastify.register(require("./routes"), { prefix: "/api" });

fastify.listen(5000);
