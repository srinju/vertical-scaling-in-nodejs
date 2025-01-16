# vertical-scaling-in-nodejs

# capacity estimation >

-- Handling traffic spikes>(CRUDE WAY)

suppose we have 4 servers running for an app and there are 10 req/s. what will we do if there are lets's sat 1M req/s
we will create a nodejs process for eg.
and all the servers will report the nodejs process that the last hour we received 1000 , 2000 , 3000 req/s ..etc..etc
and this nodejs process will compute the average requests they are getting and they will talk to the asg(auto scaling group) and tell them to scale up or down based on the demand

THIS WORKS VERY NICELY FOR HTTP SERVERS (NOT FOR WEBSOCKET CONNECIONS)

-- For a real time appication (there is no req per sec , there is a persistent socket conncetion) >

lets say for a video transcoding service like yt
whenever u upload a video to yt they transcode the video to various qualities .  this thing takes time . so for each user you have to give them a compute for specific amt of time for the transcodeing to happen (expensive operation)
now suppose we have 3 machines .. so first user uploads video .. gets access to one machine . second one gets another and third one gets another . what happens to thge fourthe user who uploads the video for transcoding ??

we have 20 warmpools ready (they are 20 machines reafdy for service immediately) ,  that is if there is 20 uploads in 1 min ..  then the compute distributes to this warm pools and compute happens there
now for the 21st uplaod ? , and also it would be good if 30 videos can be shared between the 20 warm machines for the unused compute of the cpus to be utilised 

so for many uploiads within ourt limit we scale up our servers

another approach is we have differenet workers for the transcoding service and we have a queue where all the uploads are stored and gets picked up by the workers.
what we can do . is whenever there is a lot of uploads beyond our service level agrrement that is the queue length becomees large then we scale up our servers that is increase the number of workers. (THIS APPROACH IS SLOWER)
This queue sys design approach may work for the youtube transcodeing as yt says to you (it is there SLA) that it will take 1 - 2 hours for the transcoding to happen.
for a replit like application , ther queue architecture will  not work as they dont get that much warm pools as they dont expect 1000 repls to be created in a single second

WATCH THE HOTSTAR SCALING UP DURING IPL MATCHES VIDEO
