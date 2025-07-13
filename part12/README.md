# Full Stack Open - Part 12 - Containers - Exercises


## Exercise 12.1.

### <em>Warning</em>

Since we are stepping right outside of our comfort zone as JavaScript developers, this part may require you to take a detour and familiarize yourself with shell / command line / command prompt / terminal before getting started.

If you have only ever used a graphical user interface and never touched e.g. Linux or terminal on Mac, or if you get stuck in the first exercises we recommend doing the Part 1 of "Computing tools for CS studies" first: [https://tkt-lapio.github.io/en/](https://tkt-lapio.github.io/en/). Skip the section for "SSH connection" and Exercise 11. Otherwise, it includes everything you are going to need to get started here!

### 12.1: Using a computer (without graphical user interface)

Step 1: Read the text below the "Warning" header.

Step 2: Download this [repository]() and make it your submission repository for this part.

Step 3: Run <em>curl [http://helsinki.fi](http://helsinki.fi/)</em> and save the output into a file. Save that file into your repository as file <em>script-answers/exercise12_1.txt</em>. The directory script-answers was created in the previous step.


## Exercise 12.2.

Some of these exercises do not require you to write any code or configurations to a file. In these exercises you should use [script](https://man7.org/linux/man-pages/man1/script.1.html) command to record the commands you have used; try it yourself with `script` to start recording, `echo "hello"` to generate some output, and exit to stop recording. It saves your actions into a file named "typescript" (that has nothing to do with the TypeScript programming language, the name is just a coincidence).

If `script` does not work, you can just copy-paste all commands you used into a text file.

### 12.2: Running your second container

    Use `script` to record what you do, save the file as script-answers/exercise12_2.txt

The hello-world output gave us an ambitious task to do. Do the following:

  *  Step 1. Run an Ubuntu container with the command given by hello-world

The step 1 will connect you straight into the container with bash. You will have access to all of the files and tools inside of the container. The following steps are run within the container:

  *  Step 2. Create directory <em>/usr/src/app</em>
  *  Step 3. Create a file <em>/usr/src/app/index.js</em>
  *  Step 4. Run exit to quit from the container

Google should be able to help you with creating directories and files.


## Exercises 12.3. - 12.4.

### 12.3: Ubuntu 101

    Use `script` to record what you do, save the file as script-answers/exercise12_3.txt

Edit the `/usr/src/app/index.js` file inside the container with the now installed Nano and add the following line

```
console.log('Hello World')
```

If you are not familiar with Nano you can ask for help in the chat or Google.

### 12.4: Ubuntu 102

    Use `script` to record what you do, save the file as script-answers/exercise12_4.txt

Install Node while inside the container and run the index file with `node /usr/src/app/index.js` in the container.

The instructions for installing Node are sometimes hard to find, so here is something you can copy-paste:

```
curl -sL https://deb.nodesource.com/setup_20.x | bash
apt install -y nodejs
```

You will need to install the `curl` into the container. It is installed in the same way as you did with `nano`.

After the installation, ensure that you can run your code inside the container with the command:

```
root@b8548b9faec3:/# node /usr/src/app/index.js
Hello World
```

## Exercise 12.5.

### 12.5: Containerizing a Node application

The repository that you cloned or copied in the [first exercise](https://fullstackopen.com/en/part12/introduction_to_containers#exercise-12-1) contains a todo-app. See the todo-app/todo-backend and read through the README. We will not touch the todo-frontend yet.

  *  Step 1. Containerize the todo-backend by creating a <em>todo-app/todo-backend/Dockerfile</em> and building an image.
  *  Step 2. Run the todo-backend image with the correct ports open. Make sure the visit counter increases when used through a browser in [http://localhost:3000/](http://localhost:3000/) (or some other port if you configure so)

Tip: Run the application outside of a container to examine it before starting to containerize.


## Exercise 12.6.

### 12.6: Docker compose

Create a <em>todo-app/todo-backend/docker-compose.yml</em> file that works with the Node application from the previous exercise.

The visit counter is the only feature that is required to be working.


## Exercise 12.7.

### 12.7: Little bit of MongoDB coding

Note that this exercise assumes that you have done all the configurations made in the material after exercise 12.5. You should still run the todo-app backend <em>outside a container</em>; just the MongoDB is containerized for now.

The todo application has no proper implementation of routes for getting one todo (GET <em>/todos/:id</em>) and updating one todo (PUT <em>/todos/:id</em>). Fix the code.


## Exercise 12.8.

### 12.8: Mongo command-line interface

    Use `script` to record what you do, save the file as script-answers/exercise12_8.txt

While the MongoDB from the previous exercise is running, access the database with the Mongo command-line interface (CLI). You can do that using docker exec. Then add a new todo using the CLI.

The command to open CLI when inside the container is mongosh

The Mongo CLI will require the username and password flags to authenticate correctly. Flags `-u root -p example` should work, the values are from the `docker-compose.dev.yml`.

  *  Step 1: Run MongoDB
  *  Step 2: Use <em>docker exec</em> to get inside the container
  *  Step 3: Open Mongo CLI

When you have connected to the Mongo CLI you can ask it to show the DBs inside:

```
> show dbs
admin         0.000GB
config         0.000GB
local         0.000GB
the_database  0.000GB
```

To access the correct database:

```
> use the_database
```

And finally to find out the collections:

```
> show collections
todos
```

We can now access the data in those collections:

```
> db.todos.find({})
[
  {
    _id: ObjectId("633c270ba211aa5f7931f078"),
    text: 'Write code',
    done: false
  },
  {
    _id: ObjectId("633c270ba211aa5f7931f079"),
    text: 'Learn about containers',
    done: false
  }
]
```

Insert one new todo with the text: "Increase the number of tools in my tool belt" with the status done as <em>false</em>. Consult the [documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) to see how the addition is done.

Ensure that you see the new todo both in the Express app and when querying from Mongo CLI.


## Exercises 12.9. - 12.11.

### 12.9: Set up Redis for the project

The Express server has already been configured to use Redis, and it is only missing the `REDIS_URL` environment variable. The application will use that environment variable to connect to the Redis. Read through the [Docker Hub page for Redis](https://hub.docker.com/_/redis), add Redis to the <em>todo-app/todo-backend/docker-compose.dev.yml</em> by defining another service after mongo:

```
services:
  mongo:
    ...
  redis:
    ???
```

Since the Docker Hub page doesn't have all the info, we can use Google to aid us. The default port for Redis is found by doing so:

![plot](./exercises-media/redis_port_by_google.png)

We won't have any idea if the configuration works unless we try it. The application will not start using Redis by itself, that shall happen in the next exercise.

Once Redis is configured and started, restart the backend and give it the <em>REDIS_URL</em>, which has the form <em>redis://host:port</em>

```
REDIS_URL=insert-redis-url-here MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run dev
```

You can now test the configuration by adding the line

```
const redis = require('../redis')
```

to the Express server e.g. in the file <em>routes/index.js</em>. If nothing happens, the configuration is done right. If not, the server crashes:

```
events.js:291
      throw er; // Unhandled 'error' event
      ^

Error: Redis connection to localhost:637 failed - connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1144:16)
Emitted 'error' event on RedisClient instance at:
    at RedisClient.on_error (/Users/mluukkai/opetus/docker-fs/container-app/express-app/node_modules/redis/index.js:342:14)
    at Socket.<anonymous> (/Users/mluukkai/opetus/docker-fs/container-app/express-app/node_modules/redis/index.js:223:14)
    at Socket.emit (events.js:314:20)
    at emitErrorNT (internal/streams/destroy.js:100:8)
    at emitErrorCloseNT (internal/streams/destroy.js:68:3)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6379
}
[nodemon] app crashed - waiting for file changes before starting...
```

### 12.10:

The project already has [https://www.npmjs.com/package/redis](https://www.npmjs.com/package/redis) installed and two functions "promisified" - getAsync and setAsync.

  *  setAsync function takes in key and value, using the key to store the value.
  *  getAsync function takes in a key and returns the value in a promise.

Implement a todo counter that saves the number of created todos to Redis:

  *  Step 1: Whenever a request is sent to add a todo, increment the counter by one.
  *  Step 2: Create a GET /statistics endpoint where you can ask for the usage metadata. The format should be the following JSON:

```
{
  "added_todos": 0
}
```

### 12.11:

    Use `script` to record what you do, save the file as script-answers/exercise12_11.txt

If the application does not behave as expected, direct access to the database may be beneficial in pinpointing problems. Let us try out how [redis-cli](https://redis.io/topics/rediscli) can be used to access the database.

  *  Go to the Redis container with `docker exec` and open the redis-cli.
  *  Find the key you used with [KEYS *](https://redis.io/commands/keys)
  *  Check the value of the key with the command [GET](https://redis.io/commands/get)
  *  Set the value of the counter to 9001, find the right command from [here](https://redis.io/commands/)
  *  Make sure that the new value works by refreshing the page [http://localhost:3000/statistics](http://localhost:3000/statistics)
  *  Create a new todo with Postman and ensure from redis-cli that the counter has increased accordingly
  *  Delete the key from the cli and ensure that the counter works when new todos are added


## Exercise 12.12.

### 12.12: Persisting data in Redis

Check that the data is not persisted by default, after running:

```
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```

the counter value is reset to 0.

Then create a volume for Redis data (by modifying <em>todo-app/todo-backend/docker-compose.dev.yml</em>) and make sure that the data survives after running:

```
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```

## Exercises 12.13 - 12.14.

### 12.13: Todo application frontend

Finally, we get to the todo-frontend. View the todo-app/todo-frontend and read through the README.

Start by running the frontend outside the container and ensure that it works with the backend.

Containerize the application by creating <em>todo-app/todo-frontend/Dockerfile</em> and use the [ENV](https://docs.docker.com/engine/reference/builder/#env) instruction to pass `VITE_BACKEND_URL` to the application and run it with the backend. The backend should still be running outside a container.

**Note** that you need to set `VITE_BACKEND_URL` before building the frontend, otherwise, it does not get defined in the code!

### 12.14: Testing during the build process

One interesting possibility that utilizing multi-stage builds gives us, is to use a separate build stage for [testing](https://docs.docker.com/language/nodejs/run-tests/). If the testing stage fails, the whole build process will also fail. Note that it may not be the best idea to move <em>all testing</em> to be done during the building of an image, but there may be <em>some</em> containerization-related tests where it might be worth considering.

Extract a component <em>Todo</em> that represents a single todo. Write a test for the new component and add running the tests into the build process.

You can add a new build stage for the test if you wish to do so. If you do so, remember to read the last paragraph before exercise 12.13 again!


## Exercise 12.15

### 12.15: Set up a frontend development environment

Create <em>todo-frontend/docker-compose.dev.yml</em> and use volumes to enable the development of the todo-frontend while it is running inside a container.


## Exercise 12.16

### 12.16: Run todo-backend in a development container

Use volumes and Nodemon to enable the development of the todo app backend while it is running <em>inside</em> a container. Create a <em>todo-backend/dev.Dockerfile</em> and edit the <em>todo-backend/docker-compose.dev.yml</em>.

You will also need to rethink the connections between backend and MongoDB / Redis. Thankfully Docker Compose can include environment variables that will be passed to the application:

```
services:
  server:
    image: ...
    volumes:
      - ...
    ports:
      - ...
    environment: 
      - REDIS_URL=redisurl_here
      - MONGO_URL=mongourl_here
```

The URLs are purposefully wrong, you will need to set the correct values. Remember to <em>look all the time what happens in the console</em>. If and when things blow up, the error messages hint at what might be broken.

Here is a possibly helpful image illustrating the connections within the docker network:

![plot](./exercises-media/15a.png)


## Exercises 12.17. - 12.19.

### 12.17: Set up an Nginx reverse proxy server in front of todo-frontend

We are going to put the Nginx server in front of both todo-frontend and todo-backend. Let's start by creating a new docker-compose file <em>todo-app/docker-compose.dev.yml</em> and <em>todo-app/nginx.dev.conf</em>.

```
todo-app
├── todo-frontend
├── todo-backend
├── nginx.dev.conf└── docker-compose.dev.yml
```

Add the services Nginx and the todo-frontend built with <em>todo-app/todo-frontend/dev.Dockerfile</em> into the <em>todo-app/docker-compose.dev.yml</em>.

![plot](./exercises-media/17a.png)

In this and the following exercises you **do not** need to support the build option, that is, the command:

```
docker compose -f docker-compose.dev.yml up --build
```

It is enough to build the frontend and backend at their own repositories.

### 12.18: Configure the Nginx server to be in front of todo-backend

Add the service todo-backend to the docker-compose file <em>todo-app/docker-compose.dev.yml</em> in development mode.

Add a new location to the <em>nginx.dev.conf</em> file, so that requests to `/api` are proxied to the backend. Something like this should do the trick:

```
  server {
    listen 80;

    # Requests starting with root (/) are handled
    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      
      proxy_pass ...
    }

    # Requests starting with /api/ are handled
    location /api/ {
      proxy_pass ...
    }
  }
```

The `proxy_pass` directive has an interesting feature with a trailing slash. As we are using the path `/api` for location but the backend application only answers in paths `/` or `/todos` we will want the `/api` to be removed from the request. In other words, even though the browser will send a GET request to `/api/todos/1` we want the Nginx to proxy the request to `/todos/1`. Do this by adding a trailing slash `/` to the URL at the end of `proxy_pass`.

This is a [common issue](https://serverfault.com/questions/562756/how-to-remove-the-path-with-an-nginx-proxy-pass)

![plot](./exercises-media/nginx_trailing_slash_stackoverflow.png)

This illustrates what we are looking for and may be helpful if you are having trouble:

![plot](./exercises-media/18a.png)

### 12.19: Connect the services, todo-frontend with todo-backend

<blockquote>In this exercise, submit the entire development environment, including both Express and React applications, dev.Dockerfiles and docker-compose.dev.yml.</blockquote>

Finally, it is time to put all the pieces together. Before starting, it is essential to understand <em>where</em> the React app is actually run. The above diagram might give the impression that React app is run in the container but it is totally wrong.

It is just the <em>React app source code</em> that is in the container. When the browser hits the address [http://localhost:8080](http://localhost:8080/) (assuming that you set up Nginx to be accessed in port 8080), the React source code gets downloaded from the container to the browser:

![plot](./exercises-media/19a.png)

Next, the browser starts executing the React app, and all the requests it makes to the backend should be done through the Nginx reverse proxy:

![plot](./exercises-media/19b.png)

The frontend container is actually only accessed on the first request that gets the React app source code to the browser.

Now set up your app to work as depicted in the above figure. Make sure that the todo-frontend works with todo-backend. It will require changes to the `VITE_BACKEND_URL` environmental variable in the frontend.

Make sure that the development environment is now fully functional, that is:

  *  all features of the todo app work
  *  you can edit the source files and the changes take effect by reloading the app
  *  frontend should access the backend through Nginx, so the requests should be done to [http://localhost:8080/api/todos](http://localhost:8080/api/todos):

![plot](./exercises-media/19c.png)

Note that your app should work even if no [exposed port](https://docs.docker.com/network/#published-ports) are defined for the backend and frontend in the docker compose file:

```
services:
  app:
    image: todo-front-dev
    volumes:
      - ./todo-frontend/:/usr/src/app
    # no ports here!

  server:
      image: todo-back-dev
      volumes:
        - ./todo-backend/:/usr/src/app
      environment: 
        - ...
      # no ports here!

  nginx:
    image: nginx:1.20.1
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - 8080:80 # this is needed
    container_name: reverse-proxy
    depends_on:
      - app
```

We just need to expose the Nginx port to the host machine since the access to the backend and frontend is proxied to the right container port by Nginx. Because Nginx, frontend and backend are defined in the same Docker compose configuration, Docker puts those to the same [Docker network](https://docs.docker.com/network/) and thanks to that, Nginx has direct access to frontend and backend containers ports.


## Exercises 12.20.-12.22.

### 12.20:

Create a production <em>todo-app/docker-compose.yml</em> file with all of the services, Nginx, todo-backend, todo-frontend, MongoDB and Redis. Use Dockerfiles instead of <em>dev.Dockerfiles</em> and make sure to start the applications in production mode.

Please use the following structure for this exercise:

```
todo-app
├── todo-frontend
├── todo-backend
├── nginx.dev.conf
├── docker-compose.dev.yml
├── nginx.conf└── docker-compose.yml
```

### 12.21:

Create a similar containerized development environment of one of <em>your own</em> full stack apps that you have created during the course or in your free time. You should structure the app in your submission repository as follows:

```
└── my-app
    ├── frontend
    |    └── dev.Dockerfile
    ├── backend
    |    └── dev.Dockerfile
    ├── nginx.dev.conf
    └── docker-compose.dev.yml
```

### 12.22:

Finish this part by creating a containerized <em>production setup</em> of your own full stack app. Structure the app in your submission repository as follows:

```
└── my-app
    ├── frontend
    |    ├── dev.Dockerfile
    |    └── Dockerfile
    ├── backend
    |    └── dev.Dockerfile
    |    └── Dockerfile
    ├── nginx.dev.conf
    ├── nginx.conf
    ├── docker-compose.dev.yml
    └── docker-compose.yml
```


## Submitting exercises and getting the credits

This was the last exercise in this section. It's time to push your code to GitHub and mark all of your finished exercises to the [exercise submission system](https://studies.cs.helsinki.fi/stats/courses/fs-containers).

Exercises of this part are submitted just like in the previous parts, but unlike parts 0 to 7, the submission goes to an own [course instance](https://studies.cs.helsinki.fi/stats/courses/fs-containers). Remember that you have to finish <em>all the exercises</em> to pass this part!

Once you have completed the exercises and want to get the credits, let us know through the exercise submission system that you have completed the course:

![plot](./exercises-media/21a.png)

**Note** that you need a registration to the corresponding course part for getting the credits registered, see [here](https://fullstackopen.com/en/part0/general_info#parts-and-completion) for more information.

You can download the certificate for completing this part by clicking one of the flag icons. The flag icon corresponds to the certificate's language.