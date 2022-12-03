module.exports = {
  apps: [
    {
      name: "aoc22",
      script: "./build/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      env: {
        PORT: 3333,
      },
    },
  ],
};
