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

     components: {
      schemas: {
        PricingProfile: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            adjustmentMode: { type: "string" },
            adjustmentIncrementMode: { type: "string" },
            adjustmentValue: { type: "number" },
            productIds: {
              type: "array",
              items: { type: "string" },
            },
            customerGroupIds: {
              type: "array",
              items: { type: "string" },
            },
            customerIds: {
              type: "array",
              items: { type: "string" },
            },
            priority: { type: "number" },
            allProducts: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  
  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);