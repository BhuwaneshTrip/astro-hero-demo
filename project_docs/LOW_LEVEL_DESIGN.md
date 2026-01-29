# SpecIT AI Governance DPSEC API - Low Level Design (LLD)

**Version**: 2.0.0  
**Document Date**: January 16, 2026  
**Status**: Active  
**Approved By**: Architecture Review Board  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | Nov 2025 | Development Team | Initial LLD |
| 2.0.0 | Jan 2026 | Development Team | Kubernetes deployment, Enhanced caching |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Architecture](#2-system-architecture)
3. [Component Design](#3-component-design)
4. [Data Architecture](#4-data-architecture)
5. [Security Architecture](#5-security-architecture)
6. [API Design](#6-api-design)
7. [Service Layer Design](#7-service-layer-design)
8. [Caching Strategy](#8-caching-strategy)
9. [Authentication & Authorization](#9-authentication--authorization)
10. [Deployment Architecture](#10-deployment-architecture)
11. [Performance & Scalability](#11-performance--scalability)
12. [Error Handling & Logging](#12-error-handling--logging)
13. [Monitoring & Observability](#13-monitoring--observability)

---

## 1. Introduction

### 1.1 Purpose

This Low Level Design document provides detailed technical specifications for the SpecIT AI Governance Data Privacy and Security (DPSEC) API. It covers architecture, component interactions, data flows, security mechanisms, and deployment strategies for developers, architects, and operations teams.

### 1.2 Scope

The document covers:
- Detailed component architecture and interactions
- API endpoint specifications and data contracts
- Service layer implementations and algorithms
- Database schema and data models
- Security mechanisms and authentication flows
- Deployment configurations (Docker, Kubernetes)
- Performance optimization strategies

### 1.3 Design Principles

**SOLID Principles**
- **Single Responsibility**: Each service handles one specific domain
- **Open/Closed**: Extensible through interfaces, closed for modification
- **Liskov Substitution**: Service implementations are interchangeable
- **Interface Segregation**: Minimal, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not implementations

**Additional Principles**
- **Security by Design**: Authentication and validation at every layer
- **Fail-Safe Defaults**: Secure defaults, opt-in for relaxed security
- **Defense in Depth**: Multiple security layers
- **Least Privilege**: Minimal permissions via scope-based authorization

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                      │
│  (Web Apps, Mobile Apps, CLI Tools, Postman, curl)          │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS (TLS 1.3)
                          │ JWT Bearer Token
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   KUBERNETES CLUSTER (Optional)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Ingress / Load Balancer                  │   │
│  │         (NodePort 30500 or LoadBalancer)              │   │
│  └────────────────────────┬─────────────────────────────┘   │
│                           │                                  │
│  ┌────────────────────────▼─────────────────────────────┐   │
│  │              API PODS (2+ Replicas)                   │   │
│  │  ┌─────────────────────────────────────────────┐     │   │
│  │  │         Flask Application (API Layer)        │     │   │
│  │  │  ┌─────────────────────────────────────┐    │     │   │
│  │  │  │   Middleware Layer                   │    │     │   │
│  │  │  │  - Authentication (JWT)              │    │     │   │
│  │  │  │  - Authorization (Scope-based)       │    │     │   │
│  │  │  │  - Rate Limiting                     │    │     │   │
│  │  │  │  - Request ID Generation             │    │     │   │
│  │  │  │  - CORS                              │    │     │   │
│  │  │  └──────────────┬──────────────────────┘    │     │   │
│  │  │                 ▼                            │     │   │
│  │  │  ┌─────────────────────────────────────┐    │     │   │
│  │  │  │      Route Layer (Blueprints)        │    │     │   │
│  │  │  │  - PII Routes                        │    │     │   │
│  │  │  │  - Secrets Routes                    │    │     │   │
│  │  │  │  - Translation Routes                │    │     │   │
│  │  │  │  - Model Garden Routes               │    │     │   │
│  │  │  │  - Consistency Routes                │    │     │   │
│  │  │  │  - Validation Routes                 │    │     │   │
│  │  │  │  - Relevance Routes                  │    │     │   │
│  │  │  │  - Data Routes                       │    │     │   │
│  │  │  │  - Cache Routes                      │    │     │   │
│  │  │  └──────────────┬──────────────────────┘    │     │   │
│  │  │                 ▼                            │     │   │
│  │  │  ┌─────────────────────────────────────┐    │     │   │
│  │  │  │      Service Layer                   │    │     │   │
│  │  │  │  - PII Extraction Service            │    │     │   │
│  │  │  │  - Secrets Scanner Service           │    │     │   │
│  │  │  │  - Translation Orchestrator          │    │     │   │
│  │  │  │  - Model Garden Orchestrator         │    │     │   │
│  │  │  │  - Consistency Processor             │    │     │   │
│  │  │  │  - Relevance Processor               │    │     │   │
│  │  │  │  - Ollama Service (AI Models)        │    │     │   │
│  │  │  │  - Cache Services                    │    │     │   │
│  │  │  └──────────────┬──────────────────────┘    │     │   │
│  │  └─────────────────┼──────────────────────────┘     │   │
│  └────────────────────┼────────────────────────────────┘   │
└───────────────────────┼────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌─────────────┐
│  PostgreSQL  │ │    Redis     │ │   Ollama    │
│   Database   │ │    Cache     │ │  AI Engine  │
│   (Neon /    │ │  (In-Memory) │ │  (Local /   │
│  Kubernetes) │ │              │ │   Remote)   │
└──────────────┘ └──────────────┘ └─────────────┘
```

### 2.2 Component Layers

**Layer 1: API Gateway Layer**
- Request routing and load balancing
- TLS termination
- Rate limiting (global)
- Request/Response logging

**Layer 2: Middleware Layer**
- JWT token validation
- Scope-based authorization
- Request validation
- CORS handling
- Request ID injection
- Rate limiting (per-user/org)

**Layer 3: Route Layer**
- Endpoint definitions
- Request/response contracts
- Input validation
- Error formatting

**Layer 4: Service Layer**
- Business logic implementation
- AI model orchestration
- Data processing
- External service integration

**Layer 5: Data Layer**
- Database operations (PostgreSQL)
- Caching (Redis)
- File storage (if applicable)

### 2.3 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Runtime | Python | 3.11+ | Application runtime |
| Web Framework | Flask | 2.3+ | HTTP server and routing |
| ORM | SQLAlchemy | 2.0+ | Database abstraction |
| Validation | Pydantic | 2.0+ | Request/response validation |
| Authentication | PyJWT | 2.8.0+ | JWT token handling |
| Database | PostgreSQL | 15+ | Persistent storage |
| Cache | Redis | 7+ | In-memory caching |
| AI Models | Ollama | 0.3.2 | Local LLM execution |
| Container | Docker | 20+ | Containerization |
| Orchestration | Kubernetes | 1.28+ | Container orchestration |
| Testing | pytest | Latest | Unit and integration tests |
| NLP | spaCy | 3.7+ | Named entity recognition |

---

## 3. Component Design

### 3.1 Application Factory Pattern

**File**: `src/app.py`

```python
def create_app(config_name: str = 'development') -> Flask:
    """
    Application factory following Flask best practices.
    Creates and configures Flask application instance.
    """
    app = Flask(__name__)
    
    # Configuration loading
    configure_app(app, config_name)
    
    # Logging setupcurrent
    configure_logging(app)
    
    # CORS configuration
    configure_cors(app)
    
    # Redis initialization
    init_redis(app)
    
    # Database logging
    initialize_database_logging(app)
    
    # Middleware registration
    register_middleware(app)
    
    # Blueprint registration
    register_blueprints(app)
    
    # Error handlers
    register_error_handlers(app)
    
    # Health endpoints
    register_health_endpoints(app)
    
    return app
```

**Key Features**:
- Lazy initialization of resources
- Environment-specific configuration
- Pluggable middleware
- Blueprint-based modular architecture

### 3.2 Blueprint Architecture

Each API domain is implemented as a Flask Blueprint:

```python
# Blueprint structure
blueprints = {
    'pii': (pii_bp, '/api/v1/pii'),
    'secrets': (secrets_bp, '/api/v1/secrets'),
    'translation': (translation_bp, '/api/v1/translation'),
    'model_garden': (model_garden_bp, '/api/v1'),
    'consistency': (consistency_bp, '/api/v1'),
    'relevance': (relevance_bp, '/api/v1'),
    'validation': (validation_bp, '/api/v1/validation'),
    'data': (data_bp, '/api/v1/data'),
    'cache': (cache_bp, '/api/v1/cache')
}
```

**Blueprint Benefits**:
- Logical separation of concerns
- Independent testing
- Versioning support
- URL namespacing

### 3.3 Service Layer Components

#### 3.3.1 PII Extraction Service

**File**: `src/services/pii_extraction.py`

**Purpose**: Detect and extract personally identifiable information from text.

**Algorithm**:
1. Pattern matching using regex for structured PII (email, phone, SSN)
2. spaCy NER for unstructured PII (names, locations)
3. Heuristic analysis for context-based detection
4. Confidence scoring based on pattern match quality
5. Severity classification based on PII type

**PII Types Supported**:
- Email addresses
- Phone numbers (US and international)
- Social Security Numbers (SSN)
- Credit card numbers
- Names (with title detection)
- Physical addresses
- Date of birth
- Driver's license numbers
- Passport numbers
- Bank account numbers
- IP addresses

**Confidence Scoring**:
```python
Confidence Levels:
- VERY_HIGH (0.95-1.0): Exact pattern match with validation
- HIGH (0.80-0.94): Strong pattern match
- MEDIUM (0.60-0.79): Partial pattern match
- LOW (0.40-0.59): Weak pattern match
- VERY_LOW (0.0-0.39): Heuristic detection
```

#### 3.3.2 Secrets Scanner Service

**File**: `src/services/secrets_scanner.py`

**Purpose**: Scan code and text for hardcoded secrets and credentials.

**Detection Methods**:
1. **Pattern Matching**: Regex patterns for known secret formats
2. **Entropy Analysis**: High-entropy strings indicating potential secrets
3. **Keyword Detection**: Context-aware keyword search
4. **Provider Detection**: Specific patterns for AWS, Azure, GitHub, etc.

**Secret Types**:
- API keys
- OAuth tokens
- Private keys (RSA, SSH)
- Database credentials
- Cloud provider credentials (AWS, Azure, GCP)
- JWT tokens
- Webhook secrets
- Encryption keys

**Entropy Calculation**:
```python
entropy = -sum((count/len(text)) * log2(count/len(text)) 
               for count in char_frequency)

High Risk: entropy > 4.5
Medium Risk: 3.5 < entropy <= 4.5
Low Risk: entropy <= 3.5
```

#### 3.3.3 Translation Orchestrator

**File**: `src/services/translation_orchestrator.py`

**Purpose**: Orchestrate multi-language translation with PII handling and caching.

**Workflow**:
```
1. Extract PII from input text
2. Mask PII with tokens (e.g., [EMAIL_1], [NAME_2])
3. Check cache for existing translation
4. If cache miss:
   a. Call Ollama LLM for translation
   b. Apply translation policy (formal/casual)
   c. Format output (email/document/chat)
   d. Cache result
5. Unmask PII in translated text
6. Return translated content with metadata
```

**Translation Policies**:
- `formal_business`: Professional tone, formal grammar
- `casual`: Conversational tone
- `technical`: Preserve technical terms
- `marketing`: Persuasive language

**Response Formats**:
- `email`: Email structure with subject/body
- `document`: Formal document format
- `chat`: Conversational format
- `raw`: Plain text

#### 3.3.4 Model Garden Orchestrator

**File**: `src/services/model_garden_orchestrator.py`

**Purpose**: Execute prompts across multiple AI models and aggregate results.

**Features**:
- Multi-model execution
- Result aggregation
- Model comparison
- Performance tracking

**Supported Models**:
- OpenAI GPT models
- Ollama local models
- Custom model endpoints

#### 3.3.5 Consistency Test Processor

**File**: `src/services/consistency_processor.py`

**Purpose**: Test AI model consistency by running same prompt multiple times.

**Process**:
```
1. Queue test request (async)
2. Execute prompt N times (iterations)
3. Collect responses
4. Calculate consistency metrics:
   - Response similarity (cosine similarity)
   - Token distribution
   - Average confidence
   - Variance analysis
5. Store results with detailed analytics
```

**Consistency Metrics**:
- **Similarity Score**: Average pairwise similarity (0-1)
- **Standard Deviation**: Response variance
- **Unique Responses**: Count of distinct outputs
- **Token Stability**: Consistency in key tokens

#### 3.3.6 Ollama Service

**File**: `src/services/ollama_service.py`

**Purpose**: Interface with Ollama for local LLM execution.

**Configuration**:
```python
OLLAMA_HOST: str = "http://localhost:11434"
OLLAMA_MODEL: str = "gpt-oss:120b-cloud"
OLLAMA_TEMPERATURE: float = 0.7
OLLAMA_MAX_TOKENS: int = 2000
```

**API Methods**:
- `generate()`: Generate text completion
- `chat()`: Chat-style interaction
- `embeddings()`: Generate text embeddings

---

## 4. Data Architecture

### 4.1 Database Schema

**Database**: PostgreSQL 15+

#### 4.1.1 Core Tables

**async_consistency_tests**
```sql
CREATE TABLE async_consistency_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    prompt TEXT NOT NULL,
    input_data JSONB,
    iterations INTEGER NOT NULL DEFAULT 5,
    ai_model VARCHAR(100),
    temperature FLOAT,
    max_tokens INTEGER,
    status VARCHAR(50) NOT NULL,
    progress INTEGER DEFAULT 0,
    results JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_organization_id (organization_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

**translations**
```sql
CREATE TABLE translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    input_text TEXT NOT NULL,
    source_language VARCHAR(10) NOT NULL,
    target_languages JSONB NOT NULL,
    translated_content JSONB NOT NULL,
    pii_detected JSONB,
    translation_policy VARCHAR(50),
    response_format VARCHAR(50),
    cache_hit BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_user_id (user_id),
    INDEX idx_organization_id (organization_id),
    INDEX idx_created_at (created_at)
);
```

**model_garden_executions**
```sql
CREATE TABLE model_garden_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    models JSONB NOT NULL,
    results JSONB,
    execution_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_user_id (user_id),
    INDEX idx_organization_id (organization_id),
    INDEX idx_created_at (created_at)
);
```

**relevance_checks**
```sql
CREATE TABLE relevance_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    response TEXT NOT NULL,
    relevance_score FLOAT,
    relevance_status VARCHAR(50),
    analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_user_id (user_id),
    INDEX idx_organization_id (organization_id),
    INDEX idx_relevance_status (relevance_status),
    INDEX idx_created_at (created_at)
);
```

**pii_consent_records**
```sql
CREATE TABLE pii_consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    organization_id VARCHAR(255) NOT NULL,
    pii_type VARCHAR(50) NOT NULL,
    pii_value_hash VARCHAR(255) NOT NULL, -- SHA-256 hash
    purpose TEXT,
    consent_given BOOLEAN NOT NULL,
    consent_date TIMESTAMP WITH TIME ZONE NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE,
    withdrawal_date TIMESTAMP WITH TIME ZONE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_pii_value_hash (pii_value_hash),
    INDEX idx_consent_given (consent_given),
    UNIQUE(user_id, pii_value_hash, purpose)
);
```

**api_audit_logs**
```sql
CREATE TABLE api_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    request_id VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id VARCHAR(255),
    organization_id VARCHAR(255),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    status_code INTEGER,
    response_time_ms INTEGER,
    ip_address VARCHAR(50),
    user_agent TEXT,
    request_body JSONB,
    response_body JSONB,
    error_message TEXT,
    
    INDEX idx_request_id (request_id),
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_endpoint (endpoint)
);
```

### 4.2 Redis Cache Structure

**Cache Keys**:

```
# Prompt caching (for consistency tests)
prompt:cache:{organization_id}:{prompt_hash}
TTL: 3600 seconds (1 hour)
Value: JSON response

# Translation caching
translation:cache:{organization_id}:{input_hash}:{target_lang}
TTL: 7200 seconds (2 hours)
Value: Translated text JSON

# Attachment extraction caching
attachment:extract:{file_content_hash}
TTL: 86400 seconds (24 hours)
Value: Extracted text

# Rate limiting
rate_limit:{user_id}:{endpoint}
TTL: 60 seconds
Value: Request count

# Session storage
session:{session_id}
TTL: 1800 seconds (30 minutes)
Value: Session data JSON
```

**Hash Function**:
```python
def generate_cache_key(org_id: str, content: str) -> str:
    """Generate SHA-256 hash for cache key."""
    hash_input = f"{org_id}:{content}"
    return hashlib.sha256(hash_input.encode()).hexdigest()
```

---

## 5. Security Architecture

### 5.1 Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. Request with JWT token
       │ Authorization: Bearer <JWT>
       ▼
┌──────────────────────────────────┐
│  Middleware: require_auth        │
│  1. Extract token from header    │
│  2. Validate token signature     │
│  3. Check expiration             │
│  4. Extract claims               │
└──────┬───────────────────────────┘
       │ 2. Valid token
       │ Attach user_context to request
       ▼
┌──────────────────────────────────┐
│  Middleware: check_scope         │
│  1. Extract required scope       │
│  2. Check user has scope         │
│  3. Allow or deny                │
└──────┬───────────────────────────┘
       │ 3. Authorized
       ▼
┌──────────────────────────────────┐
│  Route Handler                   │
│  Process request                 │
└──────────────────────────────────┘
```

### 5.2 JWT Token Structure

**Algorithm**: RS256 (RSA Signature with SHA-256) or HS256 (HMAC with SHA-256)

**Token Claims**:
```json
{
  "sub": "user_123456",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "scope": [
    "PII:r",
    "PII:w",
    "SECRET:r",
    "TRANS:w",
    "CNSTEST:w"
  ],
  "org": "org_789",
  "iat": 1705449600,
  "exp": 1705453200,
  "iss": "https://auth.specit.ai",
  "aud": "specit-dpsec-api"
}
```

**Required Claims**:
- `sub`: Subject (user ID)
- `scope`: Array of permission scopes
- `iat`: Issued at (Unix timestamp)
- `exp`: Expiration (Unix timestamp)

**Optional Claims**:
- `name`: User display name
- `email`: User email
- `org`: Organization ID
- `iss`: Issuer
- `aud`: Audience

### 5.3 Scope-Based Authorization

**Scope Format**: `{RESOURCE}:{PERMISSION}`

**Available Scopes**:

| Scope | Description | Endpoints |
|-------|-------------|-----------|
| `PII:r` | Read PII data | GET /api/v1/pii/* |
| `PII:w` | Write PII operations | POST /api/v1/pii/* |
| `SECRET:r` | Read secrets scan results | GET /api/v1/secrets/* |
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

**Implementation**:
```python
@check_scope('PII:w')
def extract_pii():
    """Requires PII:w scope."""
    pass

@check_scope('TRANS:w', 'TRANS:r')
def translate_text():
    """Requires TRANS:w OR TRANS:r scope."""
    pass
```

### 5.4 Rate Limiting

**Strategy**: Token bucket algorithm per user/organization

**Limits**:
```python
DEFAULT_RATE_LIMITS = {
    'per_minute': 60,
    'per_hour': 1000,
    'per_day': 10000
}

# VIP users can have higher limits
VIP_RATE_LIMITS = {
    'per_minute': 120,
    'per_hour': 5000,
    'per_day': 50000
}
```

**Implementation**:
```python
@rate_limit_check
def endpoint():
    """Rate limit applied before execution."""
    pass
```

### 5.5 PII Encryption

**Algorithm**: AES-256-GCM (Galois/Counter Mode)

**Key Management**:
- Encryption keys stored in environment variables
- Key rotation supported
- Separate keys per organization (optional)

**Encrypted Fields**:
- PII values in database
- Consent record details
- Sensitive log data

**Implementation**:
```python
from services.pii_encryption import encrypt_pii, decrypt_pii

# Encrypt before storing
encrypted_value = encrypt_pii(pii_value, encryption_key)

# Decrypt when retrieving
decrypted_value = decrypt_pii(encrypted_value, encryption_key)
```

---

## 6. API Design

### 6.1 RESTful Design Principles

**HTTP Methods**:
- `GET`: Retrieve resources (idempotent)
- `POST`: Create resources
- `PUT`: Update resources (idempotent)
- `DELETE`: Remove resources (idempotent)

**Status Codes**:
- `200 OK`: Successful GET request
- `201 Created`: Successful POST creating resource
- `202 Accepted`: Async operation accepted
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service down

### 6.2 Request/Response Format

**Request Format**:
```http
POST /api/v1/pii/extract HTTP/1.1
Host: localhost:30500
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
X-Request-ID: req_123456789

{
  "text": "Contact John Doe at john.doe@example.com",
  "pii_types": ["email", "name"],
  "confidence_threshold": 0.6,
  "include_context": true
}
```

**Response Format** (Success):
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
          "start": 24,
          "end": 45
        }
      },
      {
        "type": "name",
        "value": "John Doe",
        "confidence": 0.85,
        "severity": "LOW",
        "location": {
          "start": 8,
          "end": 16
        }
      }
    ],
    "summary": {
      "total_detections": 2,
      "severity_counts": {
        "MEDIUM": 1,
        "LOW": 1
      }
    }
  },
  "metadata": {
    "request_id": "req_123456789",
    "timestamp": "2026-01-16T10:30:00Z",
    "processing_time_ms": 45
  }
}
```

**Response Format** (Error):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "JWT token has expired",
    "details": {
      "expired_at": "2026-01-16T09:00:00Z"
    }
  },
  "metadata": {
    "request_id": "req_123456789",
    "timestamp": "2026-01-16T10:30:00Z"
  }
}
```

### 6.3 API Endpoints Summary

#### 6.3.1 PII Endpoints

```
POST   /api/v1/pii/extract          - Extract PII from text
POST   /api/v1/pii/mask             - Mask PII in text
POST   /api/v1/pii/unmask           - Unmask previously masked PII
POST   /api/v1/pii/consent          - Record PII consent
GET    /api/v1/pii/consent/:id      - Get consent record
```

#### 6.3.2 Secrets Endpoints

```
POST   /api/v1/secrets/scan         - Scan text for secrets
GET    /api/v1/secrets/types        - List secret types
POST   /api/v1/secrets/entropy-analysis - Analyze entropy
```

#### 6.3.3 Translation Endpoints

```
POST   /api/v1/translation/translate        - Translate text
GET    /api/v1/translation/user/translations - Get user translations
GET    /api/v1/translation/:id              - Get translation by ID
GET    /api/v1/translation/policies         - List translation policies
GET    /api/v1/translation/formats          - List response formats
```

#### 6.3.4 Model Garden Endpoints

```
POST   /api/v1/model-garden/execute         - Execute across models
GET    /api/v1/model-garden/models          - List available models
GET    /api/v1/model-garden/executions/:id  - Get execution result
```

#### 6.3.5 Consistency Test Endpoints

```
POST   /api/v1/consistency-test             - Create consistency test
GET    /api/v1/consistency-test/:id         - Get test status
GET    /api/v1/consistency-test/user/tests  - Get user's tests
```

#### 6.3.6 Relevance Check Endpoints

```
POST   /api/v1/relevance-check              - Check response relevance
GET    /api/v1/relevance-check/:id          - Get check result
GET    /api/v1/relevance-check/user/checks  - Get user's checks
DELETE /api/v1/relevance-check/:id          - Delete check
```

#### 6.3.7 Validation Endpoints

```
POST   /api/v1/validation/validate          - Validate data
GET    /api/v1/validation/schema-templates  - Get schema templates
GET    /api/v1/validation/validation-rules  - Get validation rules
```

#### 6.3.8 Data Endpoints

```
POST   /api/v1/data/analyze-sensitive       - Analyze sensitive data
```

#### 6.3.9 Cache Endpoints

```
GET    /api/v1/cache/stats                  - Get cache statistics
POST   /api/v1/cache/clear                  - Clear cache
GET    /api/v1/cache/health                 - Cache health check
```

---

## 7. Service Layer Design

### 7.1 Service Interface Pattern

All services follow a consistent interface:

```python
class BaseService:
    """Base service class with common functionality."""
    
    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.security_logger = SecurityLogger(self.logger)
    
    def validate_input(self, data: Dict) -> bool:
        """Validate input data."""
        raise NotImplementedError
    
    def process(self, request: BaseRequest) -> BaseResponse:
        """Process request and return response."""
        raise NotImplementedError
    
    def handle_error(self, error: Exception) -> Dict:
        """Handle and format errors."""
        self.logger.error(f"Service error: {error}", exc_info=True)
        return {
            'success': False,
            'error': str(error)
        }
```

### 7.2 PII Masking/Unmasking Flow

```
┌─────────────────────────────────────────────┐
│  1. Original Text                            │
│  "Contact John at john@example.com"          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  2. PII Extraction                           │
│  - Detect: name="John", email="john@ex..."   │
│  - Assign tokens: [NAME_1], [EMAIL_1]        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  3. Masked Text                              │
│  "Contact [NAME_1] at [EMAIL_1]"             │
│  Token Map: {                                │
│    "NAME_1": "John",                         │
│    "EMAIL_1": "john@example.com"             │
│  }                                           │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  4. Process (Translation, Analysis, etc.)    │
│  "Contactez [NAME_1] à [EMAIL_1]"            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  5. Unmask (Restore PII)                     │
│  "Contactez John à john@example.com"         │
└─────────────────────────────────────────────┘
```

### 7.3 Translation Pipeline

```python
class TranslationOrchestrator:
    """Orchestrates translation with PII handling."""
    
    def translate(self, request: TranslationRequest) -> TranslationResponse:
        # 1. Extract PII
        pii_result = self.pii_extractor.extract(request.input_text)
        
        # 2. Mask PII
        masked_text, token_map = self.mask_pii(
            request.input_text, 
            pii_result.detections
        )
        
        # 3. Check cache
        cache_key = self.generate_cache_key(
            masked_text,
            request.target_languages
        )
        cached = self.cache.get(cache_key)
        if cached:
            return self.unmask_response(cached, token_map)
        
        # 4. Translate with Ollama
        translations = {}
        for lang_config in request.target_languages:
            prompt = self.build_translation_prompt(
                masked_text,
                lang_config.language,
                lang_config.policy,
                request.response_format
            )
            
            translation = self.ollama_service.generate(prompt)
            translations[lang_config.language_code] = translation
        
        # 5. Cache result
        self.cache.set(cache_key, translations, ttl=7200)
        
        # 6. Unmask and return
        return self.unmask_response(translations, token_map)
```

---

## 8. Caching Strategy

### 8.1 Cache Layers

**L1: Application Memory Cache** (Python dict)
- TTL: 60 seconds
- Size: 100 entries
- Use: Frequently accessed config data

**L2: Redis Cache**
- TTL: Variable (1-24 hours)
- Size: Unlimited (LRU eviction)
- Use: API responses, translations, attachment extractions

**L3: Database Query Cache** (PostgreSQL)
- Automatic query caching
- Use: Complex queries

### 8.2 Content-Based Cache Keys

**Attachment Extraction Caching**:
```python
def generate_attachment_cache_key(file_content: bytes) -> str:
    """
    Generate cache key based on file CONTENT, not filename.
    Same content = same key, even if renamed.
    """
    return hashlib.sha256(file_content).hexdigest()
```

**Benefits**:
- Renamed files hit cache
- Duplicate files detected
- Storage optimization

### 8.3 Cache Invalidation

**Time-Based Expiration**:
- Prompt cache: 1 hour
- Translation cache: 2 hours
- Attachment cache: 24 hours

**Manual Invalidation**:
```
POST /api/v1/cache/clear
```

**Event-Based Invalidation**:
- User logout: Clear user session cache
- Organization update: Clear org-specific cache
- Model update: Clear model-specific cache

### 8.4 Cache Performance Metrics

```python
cache_metrics = {
    'hit_rate': hits / (hits + misses),
    'miss_rate': misses / (hits + misses),
    'eviction_rate': evictions / total_operations,
    'avg_ttl': sum(ttl_values) / len(ttl_values),
    'memory_usage_mb': redis_memory_used / 1024 / 1024
}
```

---

## 9. Authentication & Authorization

### 9.1 Middleware Stack

```python
@app.before_request
def before_request():
    """Pre-request middleware."""
    # 1. Generate request ID
    g.request_id = str(uuid.uuid4())
    
    # 2. Log request start
    logger.info(f"Request started: {request.method} {request.path}")
    
    # 3. Record request time
    g.request_start_time = time.time()

@app.after_request
def after_request(response):
    """Post-request middleware."""
    # 1. Add security headers
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # 2. Add request ID
    response.headers['X-Request-ID'] = g.get('request_id', '')
    
    # 3. Log response
    duration = time.time() - g.get('request_start_time', time.time())
    logger.info(f"Request completed: {response.status_code} ({duration:.3f}s)")
    
    return response
```

### 9.2 Authentication Decorator

```python
def require_auth(f):
    """Require JWT authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        # Extract token
        auth_header = request.headers.get('Authorization')
        token = extract_token(auth_header)
        
        if not token:
            return jsonify({
                'success': False,
                'error': 'Missing authentication token'
            }), 401
        
        # Validate token
        try:
            claims = jwt_validator.validate_token(token)
            request.user_context = jwt_validator.extract_user_context(claims)
            request.user_id = claims.get('sub')
            request.organization_id = claims.get('org')
        except AuthenticationError as e:
            return jsonify({
                'success': False,
                'error': e.message,
                'error_code': e.error_code
            }), e.status_code
        
        return f(*args, **kwargs)
    
    return decorated
```

### 9.3 Authorization Decorator

```python
def check_scope(*required_scopes):
    """Check if user has required scope."""
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user_scopes = request.user_context.get('scopes', [])
            
            # Check if user has ANY of the required scopes
            has_scope = any(
                scope in user_scopes 
                for scope in required_scopes
            )
            
            if not has_scope:
                return jsonify({
                    'success': False,
                    'error': 'Insufficient permissions',
                    'required_scopes': list(required_scopes),
                    'user_scopes': user_scopes
                }), 403
            
            return f(*args, **kwargs)
        
        return decorated
    return decorator
```

---

## 10. Deployment Architecture

### 10.1 Docker Deployment

**Dockerfile**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY src/ ./src/
COPY run.py .

# Environment variables
ENV FLASK_ENV=production \
    PYTHONUNBUFFERED=1

# Expose port
EXPOSE 5000

# Run application
CMD ["python", "run.py"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      REDIS_HOST: redis
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      JWT_SECRET_KEY: ${JWT_SECRET_KEY}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: aigovernance_dev
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 10.2 Kubernetes Deployment

**Architecture**:
```
┌────────────────────────────────────────────────┐
│            Kubernetes Cluster                   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Namespace: aigovernance                 │  │
│  │                                          │  │
│  │  ┌────────────────┐                      │  │
│  │  │ Ingress/LB     │ NodePort 30500       │  │
│  │  └────────┬───────┘                      │  │
│  │           │                              │  │
│  │  ┌────────▼────────┐                     │  │
│  │  │ API Service     │ ClusterIP           │  │
│  │  └────────┬────────┘                     │  │
│  │           │                              │  │
│  │  ┌────────▼────────────────────┐         │  │
│  │  │ API Deployment (2 replicas) │         │  │
│  │  │ - Pod 1 (Flask app)         │         │  │
│  │  │ - Pod 2 (Flask app)         │         │  │
│  │  └─────────────────────────────┘         │  │
│  │                                          │  │
│  │  ┌─────────────┐   ┌──────────────┐    │  │
│  │  │ PostgreSQL  │   │    Redis     │    │  │
│  │  │ StatefulSet │   │ StatefulSet  │    │  │
│  │  │ (5Gi PVC)   │   │  (1Gi PVC)   │    │  │
│  │  └─────────────┘   └──────────────┘    │  │
│  │                                          │  │
│  │  ┌──────────────┐  ┌───────────────┐   │  │
│  │  │  ConfigMap   │  │    Secret     │   │  │
│  │  │ (non-secret) │  │  (sensitive)  │   │  │
│  │  └──────────────┘  └───────────────┘   │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

**Key Kubernetes Manifests**:

1. **Namespace**: `k8s/namespace.yaml`
2. **ConfigMap**: `k8s/configmap.yaml` (non-sensitive config)
3. **Secret**: `k8s/secret.yaml` (passwords, keys)
4. **API Deployment**: `k8s/api-deployment.yaml` (2 replicas)
5. **API Service**: `k8s/api-service.yaml` (NodePort 30500)
6. **PostgreSQL**: `k8s/postgres-deployment.yaml` + `k8s/postgres-pvc.yaml`
7. **Redis**: `k8s/redis-deployment.yaml` + `k8s/redis-pvc.yaml`

**Scaling**:
```bash
# Manual scaling
kubectl scale deployment/aigovernance-api --replicas=5 -n aigovernance

# Auto-scaling (HPA)
kubectl autoscale deployment aigovernance-api \
  --cpu-percent=70 \
  --min=2 \
  --max=10 \
  -n aigovernance
```

### 10.3 Environment Configuration

**Development**:
- Single instance
- Debug logging
- Relaxed rate limits
- Local Ollama

**Staging**:
- 2 replicas
- Info logging
- Standard rate limits
- Remote Ollama

**Production**:
- 5+ replicas
- Warning/error logging
- Strict rate limits
- High-availability Ollama cluster

---

## 11. Performance & Scalability

### 11.1 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| API Response Time (p95) | < 200ms | ~150ms |
| Translation Time (with cache) | < 100ms | ~50ms |
| Translation Time (no cache) | < 3s | ~2.5s |
| Concurrent Users | 500+ | Tested: 200 |
| Requests per Second | 100+ | Tested: 80 |
| Database Connection Pool | 20 | 20 |

### 11.2 Optimization Techniques

**Database Optimization**:
- Index on frequently queried columns
- Connection pooling (20 connections)
- Query result caching
- Batch inserts for logs

**Caching Strategy**:
- Redis for hot data
- Content-based attachment caching (deduplication)
- Translation result caching
- Prompt response caching

**API Optimization**:
- Async processing for long-running tasks
- Pagination for list endpoints
- Compression (gzip)
- CDN for static assets (if applicable)

**Code Optimization**:
- Lazy loading of heavy libraries (spaCy)
- Connection pooling
- Object reuse (service singletons)

### 11.3 Scalability Strategy

**Horizontal Scaling** (Preferred):
- Add more API pods
- Stateless design enables easy scaling
- Session state in Redis (shared)

**Vertical Scaling**:
- Increase pod CPU/memory limits
- Upgrade PostgreSQL instance
- Increase Redis memory

**Database Scaling**:
- Read replicas for reporting queries
- Sharding by organization_id
- Archival of old logs

---

## 12. Error Handling & Logging

### 12.1 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "pii_types",
      "reason": "Must be array of valid PII types"
    }
  },
  "metadata": {
    "request_id": "req_123456",
    "timestamp": "2026-01-16T10:30:00Z",
    "endpoint": "/api/v1/pii/extract"
  }
}
```

### 12.2 Error Code Categories

| Code Prefix | Category | HTTP Status |
|-------------|----------|-------------|
| `AUTH_` | Authentication errors | 401 |
| `AUTHZ_` | Authorization errors | 403 |
| `VALIDATION_` | Input validation errors | 400 |
| `RATE_LIMIT_` | Rate limiting errors | 429 |
| `NOT_FOUND_` | Resource not found | 404 |
| `CONFLICT_` | Resource conflict | 409 |
| `SERVER_` | Internal server errors | 500 |
| `SERVICE_` | External service errors | 503 |

### 12.3 Logging Levels

**DEBUG**: Detailed diagnostic information
```python
logger.debug("PII extraction started", extra={
    'text_length': len(text),
    'pii_types': pii_types
})
```

**INFO**: General informational messages
```python
logger.info("Translation completed", extra={
    'translation_id': str(trans_id),
    'cache_hit': cache_hit,
    'duration_ms': duration
})
```

**WARNING**: Warning messages for potential issues
```python
logger.warning("Rate limit approaching", extra={
    'user_id': user_id,
    'current_count': count,
    'limit': limit
})
```

**ERROR**: Error messages for failures
```python
logger.error("Database connection failed", exc_info=True)
```

**CRITICAL**: Critical errors requiring immediate attention
```python
logger.critical("Redis unavailable", extra={
    'service': 'redis',
    'host': redis_host
})
```

### 12.4 Real-Time Database Logging

**Implementation**: `src/utils/db_logging_config.py`

**Features**:
- Async logging to PostgreSQL
- Structured log format (JSON)
- Request/response correlation
- Performance metrics

**Log Entry**:
```python
{
    'request_id': 'req_123456',
    'timestamp': '2026-01-16T10:30:00Z',
    'user_id': 'user_789',
    'organization_id': 'org_456',
    'endpoint': '/api/v1/pii/extract',
    'method': 'POST',
    'status_code': 200,
    'response_time_ms': 145,
    'ip_address': '192.168.1.100',
    'user_agent': 'PostmanRuntime/7.36.0'
}
```

---

## 13. Monitoring & Observability

### 13.1 Health Check Endpoints

```
GET /health
GET /health/live
GET /health/ready
```

**Response**:
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "timestamp": "2026-01-16T10:30:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "ollama": "healthy"
  },
  "metrics": {
    "uptime_seconds": 3600,
    "requests_total": 10542,
    "requests_per_second": 2.93
  }
}
```

### 13.2 Metrics Collection

**Kubernetes Metrics**:
```bash
# CPU/Memory usage
kubectl top pods -n aigovernance

# Resource limits
kubectl describe pod <pod-name> -n aigovernance
```

**Application Metrics**:
- Request count per endpoint
- Average response time
- Error rate
- Cache hit rate
- Database query time

### 13.3 Logging Strategy

**Log Aggregation**:
- Kubernetes: `kubectl logs -f deployment/aigovernance-api -n aigovernance`
- Centralized: Fluentd → Elasticsearch → Kibana (optional)
- Real-time: Database logging system

**Log Retention**:
- Application logs: 30 days
- Audit logs: 1 year
- Performance logs: 90 days

### 13.4 Alerting Rules

**Critical Alerts**:
- Service down (health check fails)
- Database connection failure
- Redis unavailable
- Error rate > 5%

**Warning Alerts**:
- Response time p95 > 500ms
- CPU usage > 80%
- Memory usage > 85%
- Rate limit hit rate > 10%

---

## Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| PII | Personally Identifiable Information |
| JWT | JSON Web Token |
| LLM | Large Language Model |
| NER | Named Entity Recognition |
| TTL | Time To Live |
| PVC | Persistent Volume Claim |
| HPA | Horizontal Pod Autoscaler |
| ORM | Object-Relational Mapping |

### Appendix B: References

- Flask Documentation: https://flask.palletsprojects.com/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Redis Documentation: https://redis.io/documentation
- Kubernetes Documentation: https://kubernetes.io/docs/
- JWT Specification: https://datatracker.ietf.org/doc/html/rfc7519
- Ollama Documentation: https://ollama.ai/docs

### Appendix C: Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-16 | 2.0.0 | Added Kubernetes deployment, Enhanced caching |
| 2025-11-04 | 1.0.0 | Initial LLD document |

---

**Document Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Tech Lead | | | |
| Architect | | | |
| Security Lead | | | |

---

**End of Document**
