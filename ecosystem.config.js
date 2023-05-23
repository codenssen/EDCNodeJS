module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",

      // On doit avoir un fichier log en cas d’erreur s’enregistrant dans /logs/err.log - Utilisation de la mémoire maximum: 200 Mo

      log_file: './logs/log.log',
      max_memory_restart: '200M',

      // donnez la commande la commande PM2 pour lancer votre application avec 3 instances en parallèle

      instances: 3,
      exec_mode: 'cluster',

      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
