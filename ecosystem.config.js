module.exports = {
  apps: [
    {
      name: "aoc22",
      script: "./build/server.js",
      instances: "1",
      exec_mode: "fork",
      autorestart: true,
      watch: true,
      env: {
        PORT: 3333,
      },
    },
  ],
};
