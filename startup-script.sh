#!/bin/bash
# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &
# Install dependencies from apt
apt-get update
apt-get install -yq ca-certificates git build-essential supervisor psmisc
# Install nodejs
mkdir /opt/nodejs
curl https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm
# Get the application source code from the Google Cloud Storage bucket.
mkdir /inacure-api
gsutil -m cp -r gs://inacureapi-naufalpilotproject/inacure-api/* /inacure-api/
# Install app dependencies.
cd /inacure-api/
npm install
# Create a inacure user. The application will run as this user.
useradd -m -d /home/inacureapp inacureapp
chown -R inacureapp:inacureapp /opt/app
# Configure supervisor to run the inacure app.
cat >/etc/supervisor/conf.d/inacure-app.conf << EOF
[program:inacureapp]
directory=/inacure-api
command=npm start
autostart=true
autorestart=true
user=inacureapp
environment=HOME="/home/inacureapp",USER="inacureapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF
supervisorctl reread
supervisorctl update