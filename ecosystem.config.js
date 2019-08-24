module.exports = {
  apps : [
    {
      name    : 'Debter',
      script  : 'dist/index.js',
      watch: true,
      ignore_watch: [],
      env_development: {
        processname: 'DEBTER'
      },
      env_production: {
        processname: 'DEBTER',
        REQUEST_LOG: 'true'
      }
    }
  ]
};