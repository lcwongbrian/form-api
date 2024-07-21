## To start running the project:

1. In terminal, go to the directory under the folder "form-api".
2. To add the endpoint of MongoDB, create a ".env" in project directory with the environment variable "MONGO_URL". For example, if the MongoDB is run locally, the content of ".env" will be:

```bash
MONGO_URL="mongodb://localhost:27017"
```

3. Run command "npm install" to download all associated NPM packages.
4. Run command "npm start" to start the API. If no specific port is assigned, the default port is 8080.