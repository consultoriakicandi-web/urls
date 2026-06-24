# urls

A simple REST API to post and list URLs.

## Endpoints

### POST /urls

Submit a new URL.

**Request body**
```json
{ "url": "https://example.com" }
```

**Responses**
- `201 Created` – returns the stored URL entry
- `400 Bad Request` – `url` field is missing or not a valid http/https URL

### GET /urls

List all stored URLs.

**Response**
```json
[
  { "id": 1, "url": "https://example.com", "createdAt": "2026-06-18T22:00:00.000Z" }
]
```

## Development

```bash
npm install
npm start       # starts the server on port 3000
npm test        # runs the test suite
```
