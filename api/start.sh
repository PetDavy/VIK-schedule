#!/bin/bash

sudo docker container run \
--rm \
-e FLASK_APP=/usr/src/app/startapp.py -e FLASK_DEBUG=1 \
--mount type=bind,source=$(pwd),target=/usr/src/app \
-p 5000:5000 \
vik-schedule