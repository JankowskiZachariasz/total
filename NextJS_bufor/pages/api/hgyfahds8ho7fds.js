
import { exec } from "child_process";

export default function handler(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(ip=="192.168.0.101"){
  exec('tasklist', function(error, stdout, stderr) {
      var lines = stdout.trim().split("\n"); //split by line
      var processes = lines.slice(2); //remove the table headers
      var parsed = processes.map(function(process) {
          return process.match(/(.+?)[\s]+?(\d+)/); //match the process name and ID
      });
      parsed.map((m,i)=>{
        if(m[1]=="chrome.exe")
        process.kill(parseInt(m[2]), "SIGKILL");
      })
  });
  }
}