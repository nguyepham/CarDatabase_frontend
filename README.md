### Build the Docker image
```
docker build -t cardb_frontend .
```

### Create the Docker container
```
docker run -d --name cardb_frontend_container -p 3000:3000 cardb_frontend
```

### Navigate to [localhost:3000](http://localhost:3000) in the browser.
