FROM node:14.17.1

#Set the current working directory
WORKDIR /usr/volvo/test

#Copy all src files from machine into docker image
COPY . /usr/volvo/test

#install npm dependencies
RUN npm install

ENTRYPOINT [ "npm", "run" ]

#Run the test when the container is started
CMD ["test:local"]
