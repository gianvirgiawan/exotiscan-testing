require("dotenv").config();
const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const Inert = require("@hapi/inert");
const loadModel = require("../services/loadModel");
const InputError = require("../exceptions/InputError");

// Fungsi untuk menginisialisasi server
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  //Load model
  const model = await loadModel();
  server.app.model = model;

  // Mendaftarkan routes
  server.route(routes);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof InputError) {
      const newResponse = h.response({
        status: "fail",
        message: `${response.message} Silakan gunakan foto lain.`,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      const statusCode = response.output.statusCode; // Ambil statusCode dari output
      if (typeof statusCode === "number") {
        newResponse.code(statusCode);
      } else {
        newResponse.code(500); // Atur default ke 500 jika tidak valid
      }
      return newResponse;
    }

    return h.continue;
  });

  // Mulai server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

// Menjalankan server
init().catch((err) => {
  console.error(err);
  process.exit(1);
});
