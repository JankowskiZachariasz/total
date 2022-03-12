var Service = require('node-windows').Service;

function register() {





// Create a new service object
var svc = new Service({
  name:'BUFOR_SYNCER',
  description: 'Moduł pobierający dane z PLC.',
  script: __dirname+'\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

    
    }
 
    register();

