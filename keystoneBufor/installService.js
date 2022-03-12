var Service = require('node-windows').Service;

function register() {





// Create a new service object
var svc = new Service({
  name:'BUFOR_KEYSTONE',
  description: 'Platforma Keystone.js aplikacji bufor',
  script: __dirname+'\\node_modules\\@keystonejs\\keystone\\bin\\cli.js',
  execPath: 'C:\\Program Files\\node-v13.14.0-win-x64\\node.exe'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

    
    }
 
    register();

