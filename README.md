# 01_MockData.json-RestAPI

1.Build a rest api - Json api
2.User api -> routes
  GET /api/users -List all users
  GET /api/users/1 -Get the user with ID 1
  GET /api/users/2 -Get the user with ID 2

  POST /api/users - create new user
  PATCH /api/users/1 - edit the user with id 1
  DELETE /api/users/1 - delete the user with id 1

  NOTE :
  q. earlier it was just /users type of routes but to make a hybrid server i have 
  added /api/users. it is a good practice to do so. if request comes on normal /users api
  then route will render html file but if request comes on api/users routes then response 
  will be a json data.

 2. Dynamic Path Parameters
  GET /api/user/:id

