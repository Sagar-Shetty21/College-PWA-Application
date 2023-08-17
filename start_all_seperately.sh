#!/bin/bash

# Open a new terminal tab for 'admin' and run 'npm start'
gnome-terminal --tab --title="Admin" -- bash -c "cd admin; npm start; exec bash"

# Open a new terminal tab for 'client' and run 'npm start'
gnome-terminal --tab --title="Client" -- bash -c "cd client; npm start; exec bash"

# Open a new terminal tab for 'server' and run 'npm start'
gnome-terminal --tab --title="Server" -- bash -c "cd server; npm start; exec bash"

