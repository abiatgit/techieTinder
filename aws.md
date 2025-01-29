Signup to AWS
lauanch new instance
create key
connect
chmod 400 
Terminal-"techieTinder-key.pem"
ssh -i "techieTinder-key.pem" ubuntu@ec2-3-93-174-141.compute-1.amazonaws.com
Install node versions 
 - Front End
    - git clone the project
    - npm i
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctsl start nginx
    - sudo systemctl enable nginx
    - sudo systemxtl enable nginx
    - copy code from dist (build file) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
   - cd to Directory
   - If any update on code or new commit (git pull)
   - npm i 
   - npm run start
   - pm2 package (process manager)   
   - npm install pm2 -g 
   - pm2 start npm -- start
   - pm2 logs (to see all the logs)
   - pm2 list 
   - pm2 flush <npm>
   - pm2 stop <npm>
   - custom name (pm2 start npm --name "techieTinder-backend" -- start)

   frontend=http://3.93.174.141/
   backend= http://3.93.174.141:3000/

 nginx config
   location /api/ {
        proxy_pass http://localhost:3000/; # Proxy requests to Node.js on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    Restart Nginx
    -sudo systemctl restart nginx 
