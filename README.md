# Description
<p>For the backend API, we use <b>express js</b> to make the endpoint. We try to make endpoint that deployed on the <b>app engine</b>. The configuration for the app engine are on the <a href="https://github.com/naufal360/inacure-api/blob/main/app.yaml">app.yaml</a>. When the android hit the predict endpoint, the predict images are store in the <b>cloud storage</b> bucket. Also, for the articles image are on the cloud storage. For the database, we use <b>mongoDB</b> cloud to store the NoSQL database like the user, history user, and articles collection.</p>

# Documentation

## Sign In

- Method: POST
- Url: /api/v1/auth/signin

```json
{
  "email": "string",
  "password": "string"
}
```

## Sign Up

- Method: POST
- Url: /api/v1/auth/signup

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

## Predict

- Method: POST
- Url: /api/v1/predict
- Header: Bearer token
- Body: `multipart/form-data`

<br>

## Profile

### Get Profile

- Method: GET
- Url: /api/v1/users/profile
- Header: Bearer token

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "name":"string",
      "email": "string",
      "password": "string",
      "imageUrl": "string",
      "createdAt": "string",
    }
  ]
}
```

## Profile Images

### Get History Profile Images

- Method: GET
- Url: /api/v1/users/profile/images
- Header: Bearer token

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "userId":"string",
      "email": "string",
      "imageUrl": "string",
      "createdAt": "string",
    }
  ]
}
```

## History

### Get History

- Method: GET
- Url: /api/v1/users/history
- Header: Bearer token

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "userId":"string",
      "email": "string",
      "imageUrl": "string",
      "articleName": "string",
      "predictRate": "string",
      "createdAt": "string",
    }
  ]
}
```

## Upload Image Article

### Get Image Article

- Method: GET
- Url: /api/v1/articles/upload
- Header: Bearer token

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "url": "string",
      "name": "string",
    }
  ]
}
```

## Article

### Get Article

- Method: GET
- Url: /api/v1/articles
- Header: Bearer token

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "imageUrl": "string",
      "name": "string",
      "latinName": "string",
      "family": "string",
      "description": "string",
      "ingredient": "string",
      "efficacy": ["string"],
      "onlineShop": "string",
    }
  ]
}
```
