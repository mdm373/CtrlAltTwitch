#!/bin/bash
echo "starting..."
sudo -u twitchdemo http-server ../resources/ -p 43110 &
sudo -u twitchdemo bash  corsproxystart.sh &
echo "stated"
