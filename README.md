# github_node_api_test
A simple test application lets you validate and find github user's repository. 

# README #

* This application is built in Node JS and uses express framework.   

* The initial test data was based on this repo [Ebmbook](https://api.github.com/users/ebmbook/repos)

* Install the project first.
```
npm install
```
* Once installed, you will be able to test and run the project 
```
npm test
npm start
```
* It uses port 3000, you may change it to whichever port you like.  The port is in the .env file.

* Access the API through Swagger under localhost port 3000 [URL](http://localhost:3000/api-docs/)

* To run the source in the docker world, you simply need to create an image from the existing Dockerfile.
 ```
docker build -t github_test123 .
```

* And finally, run the docker image you just created and head over to your browser run localhost:3000 
 ```
docker run -d -p 3000:3000 github_test123
```

