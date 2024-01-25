// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "my-app",
      // URL to the GraphQL API
      url: process.env.API_URL || "localhost:3000",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js", "src/**/*.ts"],
  },
};
