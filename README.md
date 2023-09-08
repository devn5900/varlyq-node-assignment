# Varlyq Assignment

# USERS

## Get Users
    /users  -> get 

## Create a User
    /users -> post
    {
        name,
        email,
        mobile,
        password
    }

## Delete User

    /users/:userId -> delete

## Edit User Details

    /users/:userId -> put
    {
        name,
        email,
        mobile,
        password
    }
## Login 

    /login -> post
    {
        email,
        password
    }

## Refresh Token

    /users/refreshtoken -> get

    provide a Refresh token as a Bearer Token in Authorization Header

# POSTS

## Get All Posts

    /posts -> get

## Create a Post 

    /posts -> Post

    provide a Auth token as a Bearer Token in Authorization Header

    {
        message
    }

## Update a Post 

    /posts/:postId -> Post

    provide a Auth token as a Bearer Token in Authorization Header

    {
        message
    }

## Delete Post

    /posts -> delete

    provide a Refresh token as a Bearer Token in Authorization Header

## Comment

    /users/comment/:postId -> post

    provide a Refresh token as a Bearer Token in Authorization Header

    {
        comments:{
                    sentAt
                    sentBy: id of the users
                    liked: []
                 }
    }

## Update Comment

    /users/comment/:postId/:commentId -> put

    provide a Refresh token as a Bearer Token in Authorization Header

    You can set All the values or one

    {
        comments:{
                    sentAt 
                    sentBy: id of the users
                    liked: []
                 }
    }