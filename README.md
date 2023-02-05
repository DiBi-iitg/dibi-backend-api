# DiBi API

### Documentation

---

Frontend specific endpoints.

## 1. Authentication and Authorization

---

> **`Create User`**

Create new user

| POST | /api/auth/ |
| --- | --- |
| Body | email, password |

Request body

```json
{
	"email":"emailhere",
	"password":"passwordhere"
}
```

Response

```json
{
	"error": false,
	"accountCreated": true,
	"token": "63dbeeb69fe3ba1f6c973189"
}
```

---

> **`Verify User`**

Sends back access_token

---

| POST | /api/auth/verify |
| --- | --- |
| Body | token, otp |

Request body

```json
{
	"token":"63dbeeb69fe3ba1f6c973189",
	"otp":3456
}
```

Response

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNiZmZlM2E1ZTU5ZmQyMTI5ZmExZDg5IiwiaWF0IjoxNjc0OTk4Mzg3LCJleHAiOjE2NzUwMDE5ODd9.WZdXdeI9j2F9LYMTJZjpm-hlnMILheRG0gTQo63wmlk"
}
```

---

> **`Login User`**

Login to existing account, sends back access_token

---

| POST | /api/auth/verify |
| --- | --- |
| Body | token, otp |

Request body

```json
{
	"email":"emailhere",
	"password":"passwordhere"
}
```

Response

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNiZmZlM2E1ZTU5ZmQyMTI5ZmExZDg5IiwiaWF0IjoxNjc0OTk4Mzg3LCJleHAiOjE2NzUwMDE5ODd9.WZdXdeI9j2F9LYMTJZjpm-hlnMILheRG0gTQo63wmlk"
}
```

---

> **`Create Seller`**

Create new seller

| POST | /api/auth/seller |
| --- | --- |
| Body | email, password, vendorId |

Request body

```json
{
	"email":"emailhere",
	"password":"passwordhere",
	"vendorId":"vendoridhere"
}
```

Response

```json
{
	"error": false,
	"accountCreated": true,
	"token": "63dbeeb69fe3ba1f6c973189"
}
```

---

> **`Verify Seller`**

Sends back access_token

---

| POST | /api/auth/seller/verify |
| --- | --- |
| Body | token, otp |

Request body

```json
{
	"token":"63dbeeb69fe3ba1f6c973189",
	"otp":3456
}
```

Response

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNiZmZlM2E1ZTU5ZmQyMTI5ZmExZDg5IiwiaWF0IjoxNjc0OTk4Mzg3LCJleHAiOjE2NzUwMDE5ODd9.WZdXdeI9j2F9LYMTJZjpm-hlnMILheRG0gTQo63wmlk"
}
```

---

> **`Login Seller`**

Login to existing account, sends back access_token

---

| POST | /api/auth/seller/login |
| --- | --- |
| Body | token, otp |

Request body

```json
{
	"email":"emailhere",
	"password":"passwordhere"
}
```

Response

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNiZmZlM2E1ZTU5ZmQyMTI5ZmExZDg5IiwiaWF0IjoxNjc0OTk4Mzg3LCJleHAiOjE2NzUwMDE5ODd9.WZdXdeI9j2F9LYMTJZjpm-hlnMILheRG0gTQo63wmlk"
}
```

---

**For protected routes, add the Authorization `header` to your request.**

```json
"Authorization": Token <access_token-here>
```

In case of invalid or expired access_token, api responds with **status code `403`**.

Common error responses

```json
//When you provide no or invalid format of access_token
//STATUS CODE 403
{
	"error": true,
	"message": "Invalid token"
}
```

```json
//When you provide exipred access_token
//STATUS CODE 403
{
	"error": true,
	"message": "Not Authenticated"
}
```

## 2. Transactions

---

> **`Create Transaction`**

Create new user

| POST | /api/transaction/ |
| --- | --- |
| Body | vendorId, invoiceNumber, consumerDetail, txns |

```json
// txn will be an array with the following properties
"txn" : 
	[{
		id
		itemName
		itemQty
		itemPrice
		itemTotal
	}]
```

Request body

```json
{
	"vendorId":"2325",
	"invoiceNumber":"63dbfa240ec3727a312937d7",
	"txns":[
		{
			"id":"idid", 
			"itemName":"juice", 
			"itemQty":"23", 
			"itemPrice":"26", 
			"itemTotal":"598" 
		},
		{
			"id":"ididid", 
			"itemName":"juice2", 
			"itemQty":"23", 
			"itemPrice":"26", 
			"itemTotal":"598" }
	]
}
```

Response

```json
{
	"vendorId": "2325",
	"invoiceNumber": "63dbfa240ec3727a312937d7",
	"txns": [
		{
			"id": "idid",
			"itemName": "juice",
			"itemQty": "23",
			"itemPrice": "26",
			"itemTotal": "598",
			"_id": "63dc051ffe60c9fd656659bc"
		},
		{
			"id": "ididid",
			"itemName": "juice2",
			"itemQty": "23",
			"itemPrice": "26",
			"itemTotal": "598",
			"_id": "63dc051ffe60c9fd656659bd"
		}
	],
	"_id": "63dc051ffe60c9fd656659bb",
	"__v": 0
}
```

---

> **`Get all Transactions`**

| POST | /api/transaction/all |
| --- | --- |
| Body | vendorId |

Request body

```json
{
	"vendorId":"2325"
}
```

Response

```json
{
	"vendorId": "2325",
	"txns": [
		{
			"_id": "63dc051dfe60c9fd656659b3",
			"vendorId": "2325",
			"invoiceNumber": "63dbfa240ec3727a312937d7",
			"txns": [
				{
					"id": "idid",
					"itemName": "juice",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051dfe60c9fd656659b4"
				},
				{
					"id": "ididid",
					"itemName": "juice2",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051dfe60c9fd656659b5"
				}
			],
			"__v": 0
		},
		{
			"_id": "63dc051efe60c9fd656659b7",
			"vendorId": "2325",
			"invoiceNumber": "63dbfa240ec3727a312937d7",
			"txns": [
				{
					"id": "idid",
					"itemName": "juice",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051efe60c9fd656659b8"
				},
				{
					"id": "ididid",
					"itemName": "juice2",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051efe60c9fd656659b9"
				}
			],
			"__v": 0
		},
		{
			"_id": "63dc051ffe60c9fd656659bb",
			"vendorId": "2325",
			"invoiceNumber": "63dbfa240ec3727a312937d7",
			"txns": [
				{
					"id": "idid",
					"itemName": "juice",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051ffe60c9fd656659bc"
				},
				{
					"id": "ididid",
					"itemName": "juice2",
					"itemQty": "23",
					"itemPrice": "26",
					"itemTotal": "598",
					"_id": "63dc051ffe60c9fd656659bd"
				}
			],
			"__v": 0
		}
	]
}
```

## 3. Seller

---

> **`Get Seller` `PROTECTED`**

Create new user

| GET | /api/seller/ |
| --- | --- |

Response

```json
{
	"email": "ankit.99d@gmail.com",
	"name": "Test",
	"vendorId": "2323"
}
```

---

## 4. Reminders

> **`Get all reminders`** `PROTECTED`

---

| GET | /api/reminders |
| --- | --- |

Response

```json
{
	"reminders": [
		{
			"_id": "63dfc25505650f10df535f53",
			"vendorId": "2323",
			"title": "Test Reminder",
			"description": "Tesing reminders",
			"dueDate": "2023-02-05T14:46:10.295Z",
			"createdAt": "2023-02-05T14:51:01.374Z",
			"updatedAt": "2023-02-05T14:51:01.374Z"
		},
		{
			"_id": "63dfc25605650f10df535f57",
			"vendorId": "2323",
			"title": "Test Reminder",
			"description": "Tesing reminders",
			"dueDate": "2023-02-05T14:46:10.295Z",
			"createdAt": "2023-02-05T14:51:02.788Z",
			"updatedAt": "2023-02-05T14:51:02.788Z"
		}
	]
}
```

---

> **`Create Reminder`** `PROTECTED`

Create new seller

| POST | /api/reminders |
| --- | --- |
| Body | vendorId, title, description, dueDate |

Request body

```json
{
	"vendorId" : "VID2323",
	"title":"Test Reminder",
	"description":"Tesing reminders",
	"dueDate":1675608370295
}
```

Response

```json
{
	"vendorId": "VID2323",
	"title": "Test Reminder",
	"description": "Tesing reminders",
	"dueDate": "2023-02-05T14:46:10.295Z",
	"_id": "63dfc2a705650f10df535f65",
	"createdAt": "2023-02-05T14:52:23.653Z",
	"updatedAt": "2023-02-05T14:52:23.653Z",
	"__v": 0
}
```
