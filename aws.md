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
   -     
