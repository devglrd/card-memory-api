module.exports = {
  apps: [{
    name: 'nest-api',
    script: './dist/main.js',
    instances: 'max',
    ignore_watch: ['node_modules'],
    exec_mode: 'cluster',
    node_args: '--max_old_space_size=8192',
  }],
};
