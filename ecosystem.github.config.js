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
  deploy: {
    production: {
      "user": "pm2",
      "host": ["tsix.be"],
      "key": "~/.ssh/deploy.key",
      "ref": "origin/main",
      "repo": "git@github.com:opmvpc/aoc22.git",
      "path": "/var/www/pm2/aoc22",
      "post-deploy": "npm install && npm run build",
    },
  },
};
