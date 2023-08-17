#!/bin/bash

# Change directory to 'admin' and run 'npm start'
cd admin
npm start &
cd ..

# Change directory to 'client' and run 'npm start'
cd client
npm start &
cd ..

# Change directory to 'server' and run 'npm start'
cd server
npm start &
cd ..
