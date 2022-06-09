# inacure-api

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
      "name":"String",
      "email": "String",
      "password": "String",
      "imageUrl": "String",
      "createdAt": "String",
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
      "userId":"String",
      "email": "String",
      "imageUrl": "String",
      "articleName": "String",
      "predictRate": "String",
      "createdAt": "String",
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
