#! /bin/bash

mkdir ~/mongodb_data_folder
mongod --port 27012 --dbpath ~/mongodb_data_folder &

