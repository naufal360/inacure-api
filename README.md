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

## Article

### Create Article

- Method: POST

- Url: /api/v1/articles

```json
{
  "image": "file",
  "title": "string",
  "description": "string",
  "type": "string"
}
```

### Create Article

- Method: GET

- Url: /api/v1/articles

```json
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "photo": "string",
      "title": "string",
      "description": "string",
      "createdAt": "string",
      "type": "string",
      "like": "number"
    },
    {
      "photo": "string",
      "title": "string",
      "description": "string",
      "createdAt": "string",
      "type": "string",
      "like": "number"
    }
  ]
}
```
