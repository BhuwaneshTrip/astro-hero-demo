# SpecIT AI Governance DPSEC API - Developer User Manual

**Version**: 2.0.0  
**Document Date**: January 16, 2026  
**Audience**: Backend Developers & API Consumers  
**API Base URL**: `http://localhost:30500` (Kubernetes) or `http://localhost:5000` (Local)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [API Endpoints Reference](#4-api-endpoints-reference)
5. [Use Cases & Examples](#5-use-cases--examples)
6. [Error Handling](#6-error-handling)
7. [Rate Limits & Quotas](#7-rate-limits--quotas)
8. [Best Practices](#8-best-practices)
9. [Testing Guide](#9-testing-guide)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Introduction

### 1.1 What is AI Governance DPSEC API?

The AI Governance Data Privacy and Security (DPSEC) API is a backend service that provides automated tools for:

- **PII Detection**: Identify and extract personally identifiable information from text
- **Secrets Scanning**: Detect hardcoded credentials and sensitive data in code
- **Translation Services**: Multi-language translation with PII protection
- **Model Garden**: Execute prompts across multiple AI models
- **Consistency Testing**: Validate AI model response consistency
- **Relevance Checking**: Verify response relevance to questions
- **Data Validation**: Validate data against schemas and compliance rules

### 1.2 Who Should Use This API?

This API is designed for **backend developers** who need to:
- Integrate privacy and security checks into applications
- Build AI-powered features with governance controls
- Ensure compliance with data protection regulations (GDPR, HIPAA, CCPA)
- Test and validate AI model outputs

### 1.3 Key Features

✅ **JWT-Based Authentication**: Secure token-based authentication  
✅ **Scope-Based Authorization**: Fine-grained permission control  
✅ **Rate Limiting**: Protection against abuse  
✅ **Caching**: Optimized performance with intelligent caching  
✅ **Async Processing**: Long-running tasks processed asynchronously  
✅ **Audit Logging**: Complete request/response audit trail  
✅ **RESTful Design**: Standard HTTP methods and status codes  

---

## 2. Getting Started

### 2.1 API Endpoints

**Production (Kubernetes)**:
```
Base URL: http://localhost:30500
Health Check: http://localhost:30500/health
```

**Local Development**:
```
Base URL: http://localhost:5000
Health Check: http://localhost:5000/health
```

### 2.2 Prerequisites

To use the API, you need:
1. **JWT Token**: Obtained from your authentication provider
2. **Scopes**: Appropriate permission scopes embedded in the token
3. **HTTP Client**: curl, Postman, or any programming language HTTP library

### 2.3 Quick Start Example

**Step 1: Check API Health**
```bash
curl http://localhost:30500/health
```

**Response**:
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "timestamp": "2026-01-16T10:30:00Z"
}
```

**Step 2: Make Authenticated Request**
```bash
curl -X POST http://localhost:30500/api/v1/pii/extract \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "My email is john.doe@example.com"
  }'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pii_detected": [
      {
        "type": "email",
        "value": "john.doe@example.com",
        "confidence": 0.95,
        "severity": "MEDIUM",
        "location": {"start": 12, "end": 33}
      }
    ]
  }
}
```

---

## 3. Authentication & Authorization

### 3.1 JWT Token Structure

All API endpoints (except `/health`) require a JWT token in the Authorization header.

**Header Format**:
```
Authorization: Bearer <JWT_TOKEN>
```

**Token Claims (Required)**:
```json
{
  "sub": "user_123456",           // User ID
  "name": "John Doe",              // User name (optional)
  "scope": [                       // Permission scopes (required)
    "PII:r",
    "PII:w",
    "TRANS:w"
  ],
  "org": "org_789",                // Organization ID (optional)
  "iat": 1705449600,               // Issued at (Unix timestamp)
  "exp": 1705453200                // Expiration (Unix timestamp)
}
```

**Example JWT Generation** (for testing):
```python
import jwt
import time

payload = {
    "sub": "user_123456",
    "name": "John Doe",
    "scope": ["PII:r", "PII:w", "TRANS:w", "CNSTEST:w"],
    "org": "org_789",
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600  # 1 hour expiration
}

secret_key = "your-secret-key"
token = jwt.encode(payload, secret_key, algorithm="HS256")
print(token)
```

### 3.2 Permission Scopes

Each endpoint requires specific scopes. Format: `{RESOURCE}:{PERMISSION}`

**Available Scopes**:

| Scope | Permission | Endpoints |
|-------|------------|-----------|
| `PII:r` | Read PII data | GET /api/v1/pii/* |
| `PII:w` | Write PII operations | POST /api/v1/pii/extract, /mask, /unmask |
| `SECRET:r` | Read secrets scan | GET /api/v1/secrets/* |
| `SECRET:w` | Perform secrets scan | POST /api/v1/secrets/scan |
| `TRANS:r` | Read translations | GET /api/v1/translation/* |
| `TRANS:w` | Create translations | POST /api/v1/translation/translate |
| `MODEL:r` | Read model executions | GET /api/v1/model-garden/* |
| `MODEL:w` | Execute models | POST /api/v1/model-garden/execute |
| `CNSTEST:r` | Read consistency tests | GET /api/v1/consistency-test/* |
| `CNSTEST:w` | Create consistency tests | POST /api/v1/consistency-test |
| `RELEV:r` | Read relevance checks | GET /api/v1/relevance-check/* |
| `RELEV:w` | Perform relevance checks | POST /api/v1/relevance-check |
| `VALID:r` | Read validation results | GET /api/v1/validation/* |
| `VALID:w` | Validate data | POST /api/v1/validation/validate |
| `DATA:r` | Read data analysis | GET /api/v1/data/* |
| `DATA:w` | Analyze sensitive data | POST /api/v1/data/analyze-sensitive |
| `CACHE:r` | Read cache stats | GET /api/v1/cache/stats |
| `CACHE:w` | Clear cache | POST /api/v1/cache/clear |

**Scope Validation**:
- If you don't have the required scope, you'll get a `403 Forbidden` error
- Multiple scopes can be combined in a single token
- Scopes are case-sensitive

### 3.3 Error Responses

**Missing Token**:
```json
{
  "success": false,
  "error": "Missing authentication token",
  "error_code": "MISSING_TOKEN"
}
```
**Status**: 401 Unauthorized

**Invalid Token**:
```json
{
  "success": false,
  "error": "Invalid token: Signature has expired",
  "error_code": "TOKEN_EXPIRED"
}
```
**Status**: 401 Unauthorized

**Insufficient Permissions**:
```json
{
  "success": false,
  "error": "Insufficient permissions",
  "required_scopes": ["PII:w"],
  "user_scopes": ["PII:r"]
}
```
**Status**: 403 Forbidden

---

## 4. API Endpoints Reference

### 4.1 PII Extraction Endpoints

#### 4.1.1 Extract PII

**Endpoint**: `POST /api/v1/pii/extract`  
**Required Scope**: `PII:w`

**Description**: Extracts personally identifiable information from text.

**Request Body**:
```json
{
  "text": "My name is John Doe, email john.doe@example.com, SSN 123-45-6789",
  "pii_types": ["email", "name", "ssn"],  // Optional: specific types
  "confidence_threshold": 0.6,             // Optional: minimum confidence
  "include_context": true                  // Optional: include surrounding text
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "pii_detected": [
      {
        "type": "email",
        "value": "john.doe@example.com",
        "confidence": 0.95,
        "severity": "MEDIUM",
        "location": {
          "start": 30,
          "end": 51
        },
        "context": "email john.doe@example.com, SSN"
      },
      {
        "type": "ssn",
        "value": "123-45-6789",
        "confidence": 0.98,
        "severity": "CRITICAL",
        "location": {
          "start": 57,
          "end": 68
        }
      }
    ],
    "summary": {
      "total_detections": 2,
      "severity_counts": {
        "CRITICAL": 1,
        "MEDIUM": 1
      }
    }
  },
  "metadata": {
    "request_id": "req_123",
    "processing_time_ms": 45
  }
}
```

**PII Types**:
- `email`: Email addresses
- `phone`: Phone numbers
- `ssn`: Social Security Numbers
- `credit_card`: Credit card numbers
- `name`: Person names
- `address`: Physical addresses
- `date_of_birth`: Birth dates
- `driver_license`: Driver's license numbers
- `passport`: Passport numbers
- `bank_account`: Bank account numbers
- `ip_address`: IP addresses

**Confidence Levels**:
- `VERY_HIGH`: 0.95-1.0
- `HIGH`: 0.80-0.94
- `MEDIUM`: 0.60-0.79
- `LOW`: 0.40-0.59
- `VERY_LOW`: 0.0-0.39

**Severity Levels**:
- `CRITICAL`: SSN, credit card, passport
- `HIGH`: Driver's license, bank account
- `MEDIUM`: Email, phone, address, DOB
- `LOW`: Name, IP address

#### 4.1.2 Mask PII

**Endpoint**: `POST /api/v1/pii/mask`  
**Required Scope**: `PII:w`

**Description**: Mask PII in text with tokens.

**Request**:
```json
{
  "text": "Contact John at john@example.com",
  "pii_types": ["name", "email"]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "masked_text": "Contact [NAME_1] at [EMAIL_1]",
    "token_map": {
      "NAME_1": "John",
      "EMAIL_1": "john@example.com"
    },
    "pii_count": 2
  }
}
```

#### 4.1.3 Unmask PII

**Endpoint**: `POST /api/v1/pii/unmask`  
**Required Scope**: `PII:w`

**Description**: Unmask previously masked PII.

**Request**:
```json
{
  "masked_text": "Contact [NAME_1] at [EMAIL_1]",
  "token_map": {
    "NAME_1": "John",
    "EMAIL_1": "john@example.com"
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "unmasked_text": "Contact John at john@example.com"
  }
}
```

### 4.2 Secrets Scanning Endpoints

#### 4.2.1 Scan for Secrets

**Endpoint**: `POST /api/v1/secrets/scan`  
**Required Scope**: `SECRET:w`

**Description**: Scan text or code for hardcoded secrets.

**Request**:
```json
{
  "text": "AWS_KEY=AKIAIOSFODNN7EXAMPLE\nAPI_TOKEN=sk-1234567890abcdef",
  "scan_types": ["api_key", "aws_key", "private_key"],
  "entropy_threshold": 4.0
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "secrets_found": [
      {
        "type": "aws_access_key",
        "value": "AKIAIOSFODNN7EXAMPLE",
        "location": {
          "line": 1,
          "start": 8,
          "end": 28
        },
        "severity": "CRITICAL",
        "entropy": 4.2
      },
      {
        "type": "generic_api_key",
        "value": "sk-1234567890abcdef",
        "location": {
          "line": 2,
          "start": 10,
          "end": 28
        },
        "severity": "HIGH",
        "entropy": 3.9
      }
    ],
    "summary": {
      "total_secrets": 2,
      "severity_counts": {
        "CRITICAL": 1,
        "HIGH": 1
      }
    }
  }
}
```

**Secret Types**:
- `api_key`: Generic API keys
- `aws_key`: AWS access keys
- `private_key`: RSA/SSH private keys
- `oauth_token`: OAuth tokens
- `jwt_token`: JWT tokens
- `database_url`: Database connection strings
- `password`: Passwords in code

#### 4.2.2 Get Secret Types

**Endpoint**: `GET /api/v1/secrets/types`  
**Required Scope**: `SECRET:r`

**Description**: List all supported secret types.

**Response**:
```json
{
  "success": true,
  "data": {
    "secret_types": [
      {
        "type": "aws_access_key",
        "pattern": "AKIA[0-9A-Z]{16}",
        "severity": "CRITICAL"
      },
      {
        "type": "generic_api_key",
        "pattern": "[a-zA-Z0-9_-]{32,}",
        "severity": "HIGH"
      }
    ]
  }
}
```

### 4.3 Translation Endpoints

#### 4.3.1 Translate Text

**Endpoint**: `POST /api/v1/translation/translate`  
**Required Scope**: `TRANS:w`

**Description**: Translate text to multiple languages with PII protection.

**Request**:
```json
{
  "input_text": "Hello, my name is John Doe and my email is john.doe@example.com",
  "languages": [
    {
      "language": "Spanish",
      "language_code": "es",
      "policy": "formal_business"
    },
    {
      "language": "French",
      "language_code": "fr",
      "policy": "casual"
    }
  ],
  "source_language": "en",
  "response_format": "email",
  "options": {
    "parallel_execution": true
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "translation_id": "trans_abc123",
    "translations": {
      "es": {
        "translated_text": "Hola, mi nombre es John Doe y mi correo es john.doe@example.com",
        "language": "Spanish",
        "policy_applied": "formal_business"
      },
      "fr": {
        "translated_text": "Salut, je m'appelle John Doe et mon email est john.doe@example.com",
        "language": "French",
        "policy_applied": "casual"
      }
    },
    "pii_detected": [
      {
        "type": "name",
        "value": "John Doe",
        "masked_as": "[NAME_1]"
      },
      {
        "type": "email",
        "value": "john.doe@example.com",
        "masked_as": "[EMAIL_1]"
      }
    ],
    "cache_hit": false
  },
  "metadata": {
    "processing_time_ms": 2450
  }
}
```

**Translation Policies**:
- `formal_business`: Professional, formal tone
- `casual`: Conversational, friendly tone
- `technical`: Preserve technical terminology
- `marketing`: Persuasive, marketing language

**Response Formats**:
- `email`: Email structure (subject/body)
- `document`: Formal document format
- `chat`: Conversational format
- `raw`: Plain text translation

#### 4.3.2 Get User Translations

**Endpoint**: `GET /api/v1/translation/user/translations`  
**Required Scope**: `TRANS:r`

**Description**: Get user's translation history.

**Query Parameters**:
- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response**:
```json
{
  "success": true,
  "data": {
    "translations": [
      {
        "id": "trans_abc123",
        "created_at": "2026-01-16T10:30:00Z",
        "source_language": "en",
        "target_languages": ["es", "fr"],
        "cache_hit": false
      }
    ],
    "total_count": 45,
    "limit": 20,
    "offset": 0
  }
}
```

#### 4.3.3 Get Translation by ID

**Endpoint**: `GET /api/v1/translation/{translation_id}`  
**Required Scope**: `TRANS:r`

**Response**: Same as translate response with full details.

#### 4.3.4 Get Translation Policies

**Endpoint**: `GET /api/v1/translation/policies`  
**Required Scope**: `TRANS:r`

**Response**:
```json
{
  "success": true,
  "data": {
    "policies": [
      {
        "name": "formal_business",
        "description": "Professional and formal tone suitable for business communication"
      },
      {
        "name": "casual",
        "description": "Conversational and friendly tone"
      },
      {
        "name": "technical",
        "description": "Preserves technical terminology and accuracy"
      },
      {
        "name": "marketing",
        "description": "Persuasive language for marketing materials"
      }
    ]
  }
}
```

### 4.4 Model Garden Endpoints

#### 4.4.1 Execute Across Models

**Endpoint**: `POST /api/v1/model-garden/execute`  
**Required Scope**: `MODEL:w`

**Description**: Execute a prompt across multiple AI models and compare results.

**Request**:
```json
{
  "prompt": "Explain quantum computing in simple terms",
  "models": [
    {
      "provider": "ollama",
      "model": "gpt-oss:120b-cloud"
    },
    {
      "provider": "ollama",
      "model": "llama2:13b"
    }
  ],
  "options": {
    "temperature": 0.7,
    "max_tokens": 500
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "execution_id": "exec_xyz789",
    "results": [
      {
        "model": "gpt-oss:120b-cloud",
        "response": "Quantum computing uses quantum mechanics...",
        "execution_time_ms": 1200,
        "tokens_used": 87
      },
      {
        "model": "llama2:13b",
        "response": "Quantum computers leverage quantum bits...",
        "execution_time_ms": 950,
        "tokens_used": 92
      }
    ],
    "comparison": {
      "similarity_score": 0.78,
      "fastest_model": "llama2:13b",
      "most_verbose": "llama2:13b"
    }
  }
}
```

#### 4.4.2 Get Available Models

**Endpoint**: `GET /api/v1/model-garden/models`  
**Required Scope**: `MODEL:r`

**Response**:
```json
{
  "success": true,
  "data": {
    "models": [
      {
        "provider": "ollama",
        "model": "gpt-oss:120b-cloud",
        "capabilities": ["text-generation", "chat"],
        "max_tokens": 2000
      },
      {
        "provider": "ollama",
        "model": "llama2:13b",
        "capabilities": ["text-generation", "chat"],
        "max_tokens": 4096
      }
    ]
  }
}
```

### 4.5 Consistency Testing Endpoints

#### 4.5.1 Create Consistency Test

**Endpoint**: `POST /api/v1/consistency-test`  
**Required Scope**: `CNSTEST:w`

**Description**: Test AI model consistency by running same prompt multiple times.

**Request**:
```json
{
  "prompt": "Summarize the benefits of cloud computing",
  "input_data": {
    "context": "Enterprise IT infrastructure"
  },
  "iterations": 10,
  "ai_model": "gpt-oss:120b-cloud",
  "temperature": 0.7,
  "max_tokens": 200
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "test_id": "test_abc123",
    "status": "PENDING",
    "message": "Consistency test queued for processing"
  }
}
```
**Status**: 202 Accepted (async processing)

#### 4.5.2 Get Consistency Test Status

**Endpoint**: `GET /api/v1/consistency-test/{test_id}`  
**Required Scope**: `CNSTEST:r`

**Response** (In Progress):
```json
{
  "success": true,
  "data": {
    "test_id": "test_abc123",
    "status": "IN_PROGRESS",
    "progress": 60,
    "iterations_completed": 6,
    "iterations_total": 10
  }
}
```

**Response** (Completed):
```json
{
  "success": true,
  "data": {
    "test_id": "test_abc123",
    "status": "COMPLETED",
    "results": {
      "consistency_score": 0.82,
      "unique_responses": 3,
      "avg_response_length": 145,
      "std_deviation": 0.15,
      "responses": [
        "Cloud computing offers scalability...",
        "Benefits include cost reduction...",
        "Cloud provides flexibility..."
      ],
      "similarity_matrix": [
        [1.0, 0.85, 0.78],
        [0.85, 1.0, 0.80],
        [0.78, 0.80, 1.0]
      ]
    },
    "completed_at": "2026-01-16T10:35:00Z"
  }
}
```

**Test Statuses**:
- `PENDING`: Queued for processing
- `IN_PROGRESS`: Currently executing
- `COMPLETED`: Successfully completed
- `FAILED`: Execution failed

#### 4.5.3 Get User's Tests

**Endpoint**: `GET /api/v1/consistency-test/user/tests`  
**Required Scope**: `CNSTEST:r`

**Query Parameters**:
- `limit`: Results per page (default: 20)
- `offset`: Pagination offset (default: 0)
- `status`: Filter by status (optional)

**Response**:
```json
{
  "success": true,
  "data": {
    "tests": [
      {
        "test_id": "test_abc123",
        "status": "COMPLETED",
        "prompt": "Summarize cloud benefits",
        "iterations": 10,
        "created_at": "2026-01-16T10:30:00Z"
      }
    ],
    "total_count": 15
  }
}
```

### 4.6 Relevance Check Endpoints

#### 4.6.1 Check Response Relevance

**Endpoint**: `POST /api/v1/relevance-check`  
**Required Scope**: `RELEV:w`

**Description**: Check if an AI response is relevant to the question.

**Request**:
```json
{
  "question": "What is the capital of France?",
  "response": "Paris is the capital and largest city of France.",
  "threshold": 0.7
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "check_id": "check_xyz789",
    "relevance_score": 0.95,
    "relevance_status": "RELEVANT",
    "analysis": {
      "keyword_match": true,
      "semantic_similarity": 0.92,
      "context_alignment": 0.98
    }
  }
}
```

**Relevance Status**:
- `HIGHLY_RELEVANT`: Score ≥ 0.8
- `RELEVANT`: 0.6 ≤ Score < 0.8
- `PARTIALLY_RELEVANT`: 0.4 ≤ Score < 0.6
- `NOT_RELEVANT`: Score < 0.4

#### 4.6.2 Get Relevance Check

**Endpoint**: `GET /api/v1/relevance-check/{check_id}`  
**Required Scope**: `RELEV:r`

**Response**: Same as create response.

#### 4.6.3 Get User's Checks

**Endpoint**: `GET /api/v1/relevance-check/user/checks`  
**Required Scope**: `RELEV:r`

**Response**:
```json
{
  "success": true,
  "data": {
    "checks": [
      {
        "check_id": "check_xyz789",
        "relevance_score": 0.95,
        "relevance_status": "RELEVANT",
        "created_at": "2026-01-16T10:30:00Z"
      }
    ],
    "total_count": 23
  }
}
```

### 4.7 Validation Endpoints

#### 4.7.1 Validate Data

**Endpoint**: `POST /api/v1/validation/validate`  
**Required Scope**: `VALID:w`

**Description**: Validate data against schemas and compliance rules.

**Request**:
```json
{
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30
  },
  "schema": {
    "type": "object",
    "properties": {
      "name": {"type": "string", "minLength": 1},
      "email": {"type": "string", "format": "email"},
      "age": {"type": "integer", "minimum": 18}
    },
    "required": ["name", "email"]
  },
  "compliance_frameworks": ["GDPR", "HIPAA"]
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "valid": true,
    "errors": [],
    "compliance_results": {
      "GDPR": {
        "compliant": true,
        "checks": [
          {"rule": "consent_required", "status": "PASS"},
          {"rule": "data_minimization", "status": "PASS"}
        ]
      }
    }
  }
}
```

#### 4.7.2 Get Schema Templates

**Endpoint**: `GET /api/v1/validation/schema-templates`  
**Required Scope**: `VALID:r`

**Response**:
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "name": "user_profile",
        "schema": {...}
      },
      {
        "name": "payment_data",
        "schema": {...}
      }
    ]
  }
}
```

### 4.8 Cache Management Endpoints

#### 4.8.1 Get Cache Statistics

**Endpoint**: `GET /api/v1/cache/stats`  
**Required Scope**: `CACHE:r`

**Description**: Get cache performance statistics for your organization.

**Response**:
```json
{
  "success": true,
  "data": {
    "statistics": {
      "total_entries": 1234,
      "hit_rate": 0.78,
      "miss_rate": 0.22,
      "avg_ttl_seconds": 3600,
      "memory_usage_mb": 45.6,
      "organization_id": "org_789"
    }
  }
}
```

#### 4.8.2 Clear Cache

**Endpoint**: `POST /api/v1/cache/clear`  
**Required Scope**: `CACHE:w`

**Description**: Clear all cache entries for your organization.

**Response**:
```json
{
  "success": true,
  "data": {
    "message": "Cache cleared successfully",
    "responses_cleared": 156
  }
}
```

---

## 5. Use Cases & Examples

### 5.1 Use Case: PII Detection in User Input

**Scenario**: Validate user registration form for PII before storing.

**Python Example**:
```python
import requests

API_URL = "http://localhost:30500/api/v1/pii/extract"
JWT_TOKEN = "your_jwt_token_here"

headers = {
    "Authorization": f"Bearer {JWT_TOKEN}",
    "Content-Type": "application/json"
}

data = {
    "text": "Name: John Doe, Email: john@example.com, Phone: 555-123-4567",
    "pii_types": ["name", "email", "phone"],
    "confidence_threshold": 0.7
}

response = requests.post(API_URL, headers=headers, json=data)
result = response.json()

if result["success"]:
    pii_found = result["data"]["pii_detected"]
    for pii in pii_found:
        print(f"Found {pii['type']}: {pii['value']} (confidence: {pii['confidence']})")
```

### 5.2 Use Case: Secrets Scanning in Code Repository

**Scenario**: Scan commit for hardcoded credentials before merge.

**cURL Example**:
```bash
curl -X POST http://localhost:30500/api/v1/secrets/scan \
  -H "Authorization: Bearer ${JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "API_KEY=sk-1234567890abcdef\nDB_PASSWORD=SuperSecret123",
    "scan_types": ["api_key", "password"],
    "entropy_threshold": 3.5
  }'
```

### 5.3 Use Case: Multi-Language Translation with PII Protection

**Scenario**: Translate customer support email to multiple languages.

**JavaScript Example**:
```javascript
const axios = require('axios');

const API_URL = 'http://localhost:30500/api/v1/translation/translate';
const JWT_TOKEN = 'your_jwt_token_here';

const translateEmail = async () => {
  try {
    const response = await axios.post(API_URL, {
      input_text: "Dear John Doe, your account john.doe@example.com has been verified.",
      languages: [
        { language: "Spanish", language_code: "es", policy: "formal_business" },
        { language: "French", language_code: "fr", policy: "formal_business" }
      ],
      source_language: "en",
      response_format: "email",
      options: { parallel_execution: true }
    }, {
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const translations = response.data.data.translations;
    console.log('Spanish:', translations.es.translated_text);
    console.log('French:', translations.fr.translated_text);
  } catch (error) {
    console.error('Translation failed:', error.response.data);
  }
};

translateEmail();
```

### 5.4 Use Case: AI Model Consistency Testing

**Scenario**: Test if AI model produces consistent responses for critical prompts.

**PowerShell Example**:
```powershell
$headers = @{
    "Authorization" = "Bearer $JWT_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    prompt = "Calculate the ROI for a $100,000 investment with 8% annual return over 5 years"
    iterations = 20
    ai_model = "gpt-oss:120b-cloud"
    temperature = 0.3
    max_tokens = 150
} | ConvertTo-Json

# Create test
$response = Invoke-RestMethod -Uri "http://localhost:30500/api/v1/consistency-test" `
    -Method POST -Headers $headers -Body $body

$testId = $response.data.test_id
Write-Host "Test created: $testId"

# Poll for results
do {
    Start-Sleep -Seconds 5
    $status = Invoke-RestMethod -Uri "http://localhost:30500/api/v1/consistency-test/$testId" `
        -Method GET -Headers $headers
    Write-Host "Progress: $($status.data.progress)%"
} while ($status.data.status -ne "COMPLETED")

# Display results
$results = $status.data.results
Write-Host "Consistency Score: $($results.consistency_score)"
Write-Host "Unique Responses: $($results.unique_responses)"
```

### 5.5 Use Case: Response Relevance Verification

**Scenario**: Verify chatbot responses are relevant before showing to users.

**Go Example**:
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type RelevanceRequest struct {
    Question  string  `json:"question"`
    Response  string  `json:"response"`
    Threshold float64 `json:"threshold"`
}

func checkRelevance(question, response string) error {
    url := "http://localhost:30500/api/v1/relevance-check"
    
    reqBody := RelevanceRequest{
        Question:  question,
        Response:  response,
        Threshold: 0.7,
    }
    
    jsonData, _ := json.Marshal(reqBody)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer "+jwtToken)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    
    data := result["data"].(map[string]interface{})
    score := data["relevance_score"].(float64)
    status := data["relevance_status"].(string)
    
    fmt.Printf("Relevance: %s (score: %.2f)\n", status, score)
    
    return nil
}
```

---

## 6. Error Handling

### 6.1 Standard Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "specific_field",
      "reason": "detailed reason"
    }
  },
  "metadata": {
    "request_id": "req_123456",
    "timestamp": "2026-01-16T10:30:00Z",
    "endpoint": "/api/v1/pii/extract"
  }
}
```

### 6.2 Common Error Codes

| HTTP Status | Error Code | Description | Solution |
|-------------|-----------|-------------|----------|
| 400 | `VALIDATION_ERROR` | Invalid request data | Check request body format |
| 400 | `MISSING_REQUIRED_FIELD` | Required field missing | Add missing fields |
| 400 | `INVALID_FIELD_TYPE` | Wrong field data type | Correct field type |
| 401 | `MISSING_TOKEN` | No JWT token provided | Add Authorization header |
| 401 | `INVALID_TOKEN` | Invalid JWT signature | Use valid JWT token |
| 401 | `TOKEN_EXPIRED` | JWT token expired | Get new token |
| 401 | `MISSING_CLAIMS` | Required claims missing | Include required JWT claims |
| 403 | `INSUFFICIENT_PERMISSIONS` | Lack required scope | Request appropriate scope |
| 404 | `RESOURCE_NOT_FOUND` | Resource doesn't exist | Check resource ID |
| 409 | `RESOURCE_CONFLICT` | Resource already exists | Use different identifier |
| 413 | `TEXT_TOO_LARGE` | Request body too large | Reduce text size |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests | Wait before retrying |
| 500 | `INTERNAL_SERVER_ERROR` | Server error | Contact support |
| 503 | `SERVICE_UNAVAILABLE` | Service down | Retry later |

### 6.3 Error Handling Best Practices

**1. Always Check `success` Field**:
```python
response = requests.post(url, json=data, headers=headers)
result = response.json()

if not result.get("success"):
    error = result.get("error", {})
    print(f"Error {error.get('code')}: {error.get('message')}")
    # Handle error appropriately
else:
    # Process successful response
    data = result["data"]
```

**2. Log Request IDs for Debugging**:
```python
if not result.get("success"):
    request_id = result.get("metadata", {}).get("request_id")
    logger.error(f"API error - Request ID: {request_id}")
    # Include request_id when contacting support
```

**3. Implement Retry Logic for Transient Errors**:
```python
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

session = requests.Session()
retry = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[500, 502, 503, 504]
)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

response = session.post(url, json=data, headers=headers)
```

**4. Handle Rate Limits Gracefully**:
```python
response = requests.post(url, json=data, headers=headers)

if response.status_code == 429:
    retry_after = int(response.headers.get('Retry-After', 60))
    print(f"Rate limit exceeded. Retrying after {retry_after} seconds...")
    time.sleep(retry_after)
    response = requests.post(url, json=data, headers=headers)
```

---

## 7. Rate Limits & Quotas

### 7.1 Rate Limit Tiers

**Standard Users**:
- 60 requests per minute
- 1,000 requests per hour
- 10,000 requests per day

**VIP Users** (configurable):
- 120 requests per minute
- 5,000 requests per hour
- 50,000 requests per day

### 7.2 Rate Limit Headers

Every response includes rate limit information:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1705449660
```

### 7.3 Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 60,
      "window": "per_minute",
      "retry_after": 30
    }
  }
}
```
**HTTP Status**: 429 Too Many Requests

**Retry-After Header**: Number of seconds to wait

### 7.4 Best Practices for Rate Limits

1. **Implement exponential backoff**
2. **Cache responses when possible**
3. **Use batch operations instead of individual requests**
4. **Monitor `X-RateLimit-Remaining` header**
5. **Contact support for higher limits if needed**

---

## 8. Best Practices

### 8.1 Security Best Practices

✅ **Never hardcode JWT tokens** - Use environment variables or secret managers  
✅ **Validate responses** - Always check `success` field  
✅ **Use HTTPS in production** - Never send tokens over HTTP  
✅ **Rotate tokens regularly** - Implement token refresh mechanism  
✅ **Log API errors** - Include request IDs for debugging  
✅ **Sanitize user input** - Validate before sending to API  
✅ **Handle PII carefully** - Encrypt PII in transit and at rest  

### 8.2 Performance Best Practices

✅ **Use caching** - Same requests return cached results  
✅ **Batch requests** - Use parallel execution options  
✅ **Set appropriate timeouts** - Prevent hanging connections  
✅ **Implement connection pooling** - Reuse HTTP connections  
✅ **Compress large payloads** - Use gzip compression  
✅ **Monitor response times** - Track performance metrics  

### 8.3 Integration Best Practices

✅ **Version your API calls** - Use `/api/v1/` prefix  
✅ **Handle all error codes** - Don't assume success  
✅ **Test with invalid data** - Ensure robust error handling  
✅ **Document your integration** - Include examples and error scenarios  
✅ **Monitor API health** - Check `/health` endpoint regularly  
✅ **Use idempotency keys** - For safe request retries (if applicable)  

---

## 9. Testing Guide

### 9.1 Testing with Postman

**Step 1: Import Collection**
- File: `AIGovernance_Kubernetes.postman_collection.json`
- Import into Postman

**Step 2: Set Environment**
- Select "Kubernetes" environment
- Set `baseUrl` to `http://localhost:30500`
- Set `jwt_token` to your JWT token

**Step 3: Run Requests**
- Health check first to verify connectivity
- Run authenticated requests with token

### 9.2 Testing with curl

**Health Check**:
```bash
curl http://localhost:30500/health
```

**PII Extract**:
```bash
JWT_TOKEN="your_token_here"

curl -X POST http://localhost:30500/api/v1/pii/extract \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Contact John at john@example.com"
  }'
```

### 9.3 Testing with Python

```python
import requests
import os

API_URL = "http://localhost:30500"
JWT_TOKEN = os.getenv("JWT_TOKEN")

headers = {
    "Authorization": f"Bearer {JWT_TOKEN}",
    "Content-Type": "application/json"
}

# Test health
response = requests.get(f"{API_URL}/health")
assert response.status_code == 200

# Test PII extraction
response = requests.post(
    f"{API_URL}/api/v1/pii/extract",
    headers=headers,
    json={"text": "My email is test@example.com"}
)
assert response.status_code == 200
assert response.json()["success"] == True
```

### 9.4 Unit Testing Your Integration

```python
import unittest
from unittest.mock import patch, Mock

class TestAPIIntegration(unittest.TestCase):
    
    def setUp(self):
        self.api_url = "http://localhost:30500"
        self.jwt_token = "test_token"
        self.headers = {
            "Authorization": f"Bearer {self.jwt_token}",
            "Content-Type": "application/json"
        }
    
    @patch('requests.post')
    def test_pii_extraction_success(self, mock_post):
        # Mock successful response
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "success": True,
            "data": {"pii_detected": []}
        }
        mock_post.return_value = mock_response
        
        # Test your API call
        response = your_api_client.extract_pii("Test text")
        
        self.assertTrue(response["success"])
        self.assertEqual(len(response["data"]["pii_detected"]), 0)
    
    @patch('requests.post')
    def test_pii_extraction_auth_error(self, mock_post):
        # Mock auth error
        mock_response = Mock()
        mock_response.status_code = 401
        mock_response.json.return_value = {
            "success": False,
            "error": {"code": "INVALID_TOKEN"}
        }
        mock_post.return_value = mock_response
        
        with self.assertRaises(AuthenticationError):
            your_api_client.extract_pii("Test text")

if __name__ == '__main__':
    unittest.main()
```

---

## 10. Troubleshooting

### 10.1 Connection Issues

**Problem**: Cannot connect to API

**Solutions**:
1. Check if service is running:
   ```bash
   # Kubernetes
   kubectl get pods -n aigovernance
   
   # Docker
   docker ps | grep aigovernance
   ```

2. Verify port is accessible:
   ```bash
   # Test connection
   curl http://localhost:30500/health
   
   # Check port
   netstat -an | grep 30500
   ```

3. Check firewall rules

### 10.2 Authentication Issues

**Problem**: 401 Unauthorized errors

**Solutions**:
1. Verify JWT token format:
   ```bash
   echo $JWT_TOKEN | cut -d'.' -f2 | base64 -d
   ```

2. Check token expiration:
   ```python
   import jwt
   decoded = jwt.decode(token, options={"verify_signature": False})
   print(f"Expires at: {decoded['exp']}")
   ```

3. Ensure correct Authorization header:
   ```
   Authorization: Bearer <token>
   # NOT: Authorization: <token>
   ```

### 10.3 Permission Issues

**Problem**: 403 Forbidden errors

**Solutions**:
1. Check required scopes in error message
2. Verify your token has required scopes:
   ```python
   decoded = jwt.decode(token, options={"verify_signature": False})
   print(f"Your scopes: {decoded['scope']}")
   ```
3. Request appropriate scopes from admin

### 10.4 Rate Limit Issues

**Problem**: 429 Too Many Requests

**Solutions**:
1. Check `Retry-After` header
2. Implement exponential backoff
3. Reduce request frequency
4. Use caching to avoid duplicate requests
5. Contact support for higher limits

### 10.5 Validation Errors

**Problem**: 400 Bad Request with validation errors

**Solutions**:
1. Check error details for specific field
2. Verify request body structure
3. Ensure correct data types
4. Check required fields are present

**Example Debug Process**:
```python
response = requests.post(url, json=data, headers=headers)

if response.status_code == 400:
    error = response.json()
    print("Error details:", error.get("error", {}).get("details"))
    # Fix the specific field mentioned
```

### 10.6 Performance Issues

**Problem**: Slow response times

**Solutions**:
1. Check if caching is enabled
2. Reduce payload size
3. Use parallel execution options
4. Monitor Kubernetes pod resources:
   ```bash
   kubectl top pods -n aigovernance
   ```
5. Check database connection pool settings

### 10.7 Checking Logs

**Kubernetes Logs**:
```bash
# Real-time logs
kubectl logs -f deployment/aigovernance-api -n aigovernance

# Recent logs
kubectl logs --tail=100 deployment/aigovernance-api -n aigovernance

# Specific pod
kubectl logs <pod-name> -n aigovernance
```

**Docker Logs**:
```bash
docker logs -f aigovernance-api
docker logs --tail=100 aigovernance-api
```

### 10.8 Getting Support

When contacting support, include:
1. **Request ID** from error response
2. **Timestamp** of the issue
3. **Endpoint** you were calling
4. **Request payload** (remove sensitive data)
5. **Error response**
6. **Environment** (Kubernetes/Docker, version)

**Support Channels**:
- Email: support@specit.ai
- Issue Tracker: [GitHub Issues URL]
- Documentation: [Docs URL]

---

## Appendix A: Quick Reference

### Common Endpoints

```
Health Check:           GET  /health
PII Extract:            POST /api/v1/pii/extract
PII Mask:               POST /api/v1/pii/mask
Secrets Scan:           POST /api/v1/secrets/scan
Translate:              POST /api/v1/translation/translate
Model Garden Execute:   POST /api/v1/model-garden/execute
Consistency Test:       POST /api/v1/consistency-test
Relevance Check:        POST /api/v1/relevance-check
Cache Stats:            GET  /api/v1/cache/stats
Cache Clear:            POST /api/v1/cache/clear
```

### HTTP Status Codes

```
200 OK                  - Successful GET request
201 Created             - Resource created
202 Accepted            - Async operation queued
400 Bad Request         - Invalid input
401 Unauthorized        - Auth required/failed
403 Forbidden           - Insufficient permissions
404 Not Found           - Resource not found
429 Too Many Requests   - Rate limit exceeded
500 Internal Error      - Server error
503 Service Unavailable - Service down
```

### Required JWT Claims

```json
{
  "sub": "user_id",
  "scope": ["PII:w", "TRANS:w"],
  "iat": 1705449600,
  "exp": 1705453200
}
```

---

## Appendix B: Code Examples Repository

Complete working examples available at:
- Python: `/examples/python/`
- JavaScript: `/examples/javascript/`
- Go: `/examples/go/`
- PowerShell: `/examples/powershell/`

---

## Appendix C: Change Log

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-01-16 | Added Kubernetes deployment examples, Enhanced caching documentation |
| 1.0.0 | 2025-11-04 | Initial user manual |

---

**Document Version**: 2.0.0  
**Last Updated**: January 16, 2026  
**Maintained By**: SpecIT Development Team

---

**End of User Manual**
