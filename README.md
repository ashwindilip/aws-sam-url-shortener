# URL Shortener using AWS Lambda, API Gateway & DynamoDB

This project is a **serverless URL Shortener** built using **AWS Lambda**, **Amazon API Gateway**, **Amazon DynamoDB**, and **TypeScript**. It allows users to generate short URLs for long URLs and handle redirections efficiently.

## Features
- Generate short URLs for long links
- Redirect users from short URLs to original URLs
- Store mappings in DynamoDB with **shortCode** as the primary key
- Implement error handling for invalid requests
- Deployed using AWS Serverless Application Model (SAM)
- Uses **AWS SDK v3** for DynamoDB interactions

## Tech Stack
- **AWS Lambda** (Node.js 22.x)
- **Amazon API Gateway**
- **Amazon DynamoDB** (On-Demand Billing Mode)
- **TypeScript**
- **AWS SDK v3**
- **AWS SAM** (for deployment)
- **Thunder Client** (for API testing)

---

## Prerequisites
Before running the project, ensure you have the following:
- **Node.js** installed
- **AWS Account** with programmatic access configured
- **AWS CLI** installed and configured
- **AWS SAM CLI** installed for deployment

### DynamoDB Table Configuration
| Attribute Name | Type   |
|---------------|--------|
| shortCode     | String |
| url           | String |

---

## 📄 Project Structure
```
├── hello-world
│   ├── app.ts          # Lambda function handler
│   ├── package.json    # Dependencies
│   ├── tsconfig.json   # TypeScript Configuration
│   └── node_modules    # Installed packages (after npm install)
├── template.yaml       # AWS SAM template defining resources
└── README.md           # Project documentation
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AbhijeetAayush/Url-Shortener-AWS.git
cd Url-Shortener-AWS
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Build the Project
```bash
npm run build
```

### 4️⃣ Deploy to AWS using AWS SAM
1. **Build the application:**
   ```bash
   sam build
   ```

2. **Deploy using AWS SAM CLI:**
   ```bash
   sam deploy --guided
   ```
   Follow the prompts to configure your deployment settings.

---

## 🔥 API Endpoints

### 1️⃣ Shorten URL
- **Endpoint:**  
  ```http
  POST /shorten
  ```
- **Request Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "https://{api-gateway-url}/Prod/abc123"
  }
  ```

### 2️⃣ Redirect to Original URL
- **Endpoint:**  
  ```http
  GET /{shortCode}
  ```
- **Behavior:** Redirects to the original URL stored in DynamoDB.

---

## 🎯 Testing with Thunder Client (VSCode Extension)
1. Install the **Thunder Client** extension.
2. Send a **POST request** to `/shorten` with a JSON body containing a `url`.
3. Use the returned short URL in a **GET request** to test redirection.

---

## 💪 Error Handling & Responses
| Status Code | Message                |
|------------|------------------------|
| 400        | Missing request body    |
| 400        | Missing URL             |
| 400        | ShortCode is required   |
| 404        | Short URL not found     |
| 500        | Internal Server Error   |

---

## 📌 Environment Variables
| Name       | Description                 |
|------------|-----------------------------|
| TABLE_NAME | DynamoDB table name storing URLs |

---

## 📌 Logs & Monitoring
- **CloudWatch Logs**: View execution logs in AWS CloudWatch for debugging.
- **SAM Logs**: Run the following to fetch logs locally:
  ```bash
  sam logs -n HelloWorldFunction --tail
  ```

---

## 📌 AWS SAM Template (template.yaml)
The **AWS Serverless Application Model (SAM)** template defines the infrastructure:
- **AWS Lambda Function** (`hello-world/app.ts` as handler)
- **API Gateway Endpoints** (`/shorten` for POST, `/{shortCode}` for GET)
- **DynamoDB Table** (`ShortenedURLs` with `shortCode` as primary key)
- **IAM Policies** for Lambda to interact with DynamoDB

---

## 📜 License
This project is licensed under the **MIT License**.
