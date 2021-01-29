Plain server.

Routes requests to files located in `routes/` and calls handlers.
Serves static files under `static/`.

```javascript
const server = require('this-module')
server.start(port)
```

## Routing:
* Create a `routes/` directory.
* Routes works as follow : `/routeName/handler/param1/param2/...`
* The default page is the `start.js` file in the `routes/` directory.
* If you don't define the handler for a route, eg. by calling the URL `/api`, `/start`, etc.
  the router will call the `handle` function of your route.

### Examples
* GET / --> require the `routes/start.js` file and call the `handle` function
* GET /start --> require the `routes/start.js` file and call the `handle` function
* GET /api --> require the `routes/api.js` file and call the `handle` function
* GET /api/users --> require the `routes/api.js` file and call the `users` function
* GET /api/users/42 --> require the `routes/api.js` file and call the `users` function with one parameter (42)

### Route handler
A route handler receive 2 parameters :
* info --> informations about the request, params, etc
  * info.method --> HTTP method used for the request, eg POST, GET, PUT, etc.
  * info.path   --> requested path, eg. `/api/users/42`
  * info.data   --> data passed by POST or PUT
  * info.params --> array of parameters passed in the URL. Eg : with `/api/users/42/posts` your params will be `['42', 'posts']`
* res  --> response object (instance of http.ServerResponse), used to answer to the request

