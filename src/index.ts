

//VERTICALL SCALING IN NODE.JS >>>
//vertically scalin is increasing the size of the cpus

import express from  'express';
import cluster from 'cluster';
import os from 'os';

const totalCpus = os.cpus().length;

const port = 3000;

if(cluster.isPrimary) { //checking if this is the user started process

    console.log(`Number of cpus is ${totalCpus}`);
    console.log(`primary process ${process.pid} is running`);

    //fork workers >>

    for(let i = 0 ; i < totalCpus ; i++){
        cluster.fork(); //spawn child processes for the parent process
        //this fork that is thye child process will also go from the top of the file aND EVEntually control will reach th if statement above and it will skip it as it is not the primary process , it is a child process of the primary process
    }

    cluster.on('exit' , (worker , code , signal) => {
        console.log(` woker ${worker.process.pid} died`);
        console.log(` lets fork another worker!!`);
        cluster.fork(); //restarts a new chgild processes from the primary parent process
    });

} else {
    
    const app = express();
    console.log(`worker process ${process.pid} started`);

    app.get('/' , (req,res) => {
        res.send("hello world");
    });

    app.get("/api/:n", function (req, res) {
        let n = parseInt(req.params.n);
        let count = 0;
    
        if (n > 5000000000) n = 5000000000;
    
        for (let i = 0; i <= n; i++) {
          count += i;
        }
    
        res.send(`Final count is ${count} ${process.pid}`);
      });
    
      app.listen(port, () => {
        console.log(`App listening on port ${port}`);
      });
}

