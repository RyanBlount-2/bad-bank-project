# Pull the official base image
FROM node:14.17.6
# FROM alpine

# Define the owner
LABEL ryan <blountr2@gmail.com>

# Define the working directory
WORKDIR /app

# Environment app is running
ENV NODE_ENV=production

# Copy the code & install the npm dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add application
COPY . ./

# Run application
CMD ["npm", "start"]
