// @ts-check
const COSMOS_URL = process.env.COSMOS_URL || "";
const COSMOS_KEY = process.env.COSMOS_KEY || "";

const config = {
    endpoint: COSMOS_URL,
    key: COSMOS_KEY,
    databaseId: "Quiz",
    containerId: "leaderboard",
    partitionKey: { kind: "Hash", paths: ["/event"] }
  };
  
  module.exports = config;