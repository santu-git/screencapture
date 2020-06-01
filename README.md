# Screencapture

## How to run using docker in local.
1. Install docker engine in local machine using this link. https://docs.docker.com/engine/install/
2. Install docker compose in local machine following this link. https://docs.docker.com/compose/install/
3. Clone/Download Screencapture project in local using this link https://github.com/santu-git/screencapture
4. Get into the project directory.
5. Run application using docker compose in background mode.
```
docker-compose up -d
# application is available in http://localhost:3000
```
6. To stop project running in background.
```
# Check contianer id using following command.
docker container ls

# stop container using following command
docker container stop <container id>
```

6. Run application using docker compose in foreground.
```
docker compose up
````
