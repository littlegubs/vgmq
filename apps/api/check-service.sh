#!/bin/bash

cd /home/vgmq || exit

restartService() {
  echo "$(date) - VGMQ-API is KO - restart in progress "

  npm run start:prod
}

checkService() {
  response=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "https://api.videogamemusicquiz.com")
  if [ $response -ne 200 ]; then
    restartService
  else
    echo "$(date) - VGMQ-API is UP"
  fi
}

checkService
