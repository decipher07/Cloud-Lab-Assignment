FROM ubuntu:latest 

# Updating the Repository List
RUN apt-get update -y 
RUN apt-get install git -y 

# Installing Build Essentials
RUN apt install build-essential -y

# Installing Node and NPM
RUN apt-get update -y

# Creating a Work directory
WORKDIR /app

# Copying the folder contents
COPY . .

# Exposing the ports
EXPOSE 5000 5001