// @ts-check

const config = {
    endpoint: "https://quiz-database.documents.azure.com:443/",
    key: "xNaU5L0MaC3nmcJDujYySjN75BHmkn9AXdsb7nw3NRmirOuJETjqEowZ3rjOWcXLGbKLjroIRUdERZR4yCCiDw==",
    databaseId: "Quiz",
    containerId: "leaderboard",
    partitionKey: { kind: "Hash", paths: ["/event"] }
  };
  
  module.exports = config;