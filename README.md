# Simple Wireframe
This is the simple wireframe (kanban product managerment)

## Features
- Login
- Register
- Logout
- Change Password
- Create and Delete board
- Create, Update and Delete Column in Board
- Create, Update and Delete task cards
- Real time task and column moving using *beautifulDnD* and *socket.io*

### Diagram
![diagram](https://github.com/yugienter/simple-wireframe/blob/master/dbImage/dbdiagram.png)

## Tech Stack
### Frontend
- ReactJs
- Typescript
- scss
- React router dom
- web-socket

### Backend
- Nodejs - express
- Mongodb - mongoose
- socket.io

### Test
- Mocha
- Chai

## Build app :
**Clone source**
```
git clone https://github.com/yugienter/simple-wireframe.git
```
<br/>

**Method 1.**
<br/>Install not through docker but using mongodb Atlas.
**Go to the folder**
```
cd simple-wireframe
```
**Build in your local** : *It will install server and client dependencies*
```
make install
```

**Create env** : *use **.env.example** as template to create **.env***
```
make env_template
```

**Runs server in development**
```
make run_server
```
**Open new terminal**
<br/>Open a new terminal and go to the code folder simple-wireframe.

**Runs client in deevelopment**
```
make run_client
```

**The project will run**
```
http://localhost:3000
```

**API Unit Test**
<br/>Open a new terminal and go to the code folder simple-wireframe.
```
make server_test
```


**Method 2.**
<br/>Install through docker.

**Just ensure that docker daemon is running!**
```
docker info
```

If ```docker info``` output have 'ERROR'.
It means docker daemon in not running, then just start it, it depends of how do you installed and of your OS.

**Build**
```
make build
```

**Runs**
```
make run
```
**The project will run**
```
http://localhost:3000
```

**Stop**
```
make stop
```
<br/>

**Run and check API Unit Test**

```
docker-compose up - mongo
```
```
cd server
```
```
npm i 
```
```
npm run test
```
**Stop**
```
make stop
```
