. ~/.nvm/nvm.sh
cd /home/ec2-user/sistemas-solares-pacifico/server
forever stopall
forever start -o out.log -e err.log /home/ec2-user/sistemas-solares-pacifico/server/index.js > forever.log 2>&1 &
cd /home/ec2-user/sistemas-solares-pacifico/client
/usr/sbin/fuser -k 8080/tcp
serve -s build --listen 8080 > serve.log 2>&1 &
