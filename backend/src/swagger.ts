import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pricing Engine API",
      version: "1.0.0",
      description: "FOBOH Engineering Challenge API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },

  // files containing annotations
  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);