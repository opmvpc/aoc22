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
      production: {
        "user": "pm2",
        "key": "~/.ssh/pm2",
        "host": ["tsix.be"],
        "ref": "origin/main",
        "repo": "git@github.com:opmvpc/aoc22.git",
        "path": "/var/www/",
        "post-deploy": "npm install && npm run build",
      },
    },
  ],
};
