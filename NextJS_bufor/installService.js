var Service = require('node-windows').Service;

function register() {





// Create a new service object
var svc = new Service({
  name:'BUFOR_SERVER',
  description: 'Moduł Next.js z aplikacją React',
  script: __dirname+'\\server\\index.js',
  execPath: 'C:\\Program Files\\node-v16.14.0-win-x64\\node.exe'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

    
    }
 
    register();

