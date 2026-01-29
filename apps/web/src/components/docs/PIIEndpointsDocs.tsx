import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function PIIEndpointsDocs() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <h2 className="text-2xl font-bold text-primary-700">PII Detection & Management</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Extract, mask, and unmask Personally Identifiable Information (PII) from text with high accuracy.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" color="primary" variant="flat">12+ PII Types</Chip>
            <Chip size="sm" color="success" variant="flat">Confidence Scoring</Chip>
            <Chip size="sm" color="secondary" variant="flat">Context Preservation</Chip>
          </div>
        </CardBody>
      </Card>

      {/* Extract PII */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Extract PII</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">PII:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/pii/extract</code>
          </div>

          <Tabs aria-label="PII Extract Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "string",                      // Required: Text to analyze
  "pii_types": ["email", "name", "..."], // Optional: Specific types to detect
  "confidence_threshold": 0.6,           // Optional: Min confidence (0-1)
  "include_context": true                // Optional: Include surrounding text
}`}</pre>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Supported PII Types:</h4>
                <div className="flex gap-2 flex-wrap">
                  {['email', 'phone', 'ssn', 'credit_card', 'name', 'address', 
                    'date_of_birth', 'drivers_license', 'passport', 'bank_account', 
                    'ip_address', 'url'].map(type => (
                    <Chip key={type} size="sm" variant="bordered">{type}</Chip>
                  ))}
                </div>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "Contact John Doe at john.doe@example.com or call 555-123-4567. His SSN is 123-45-6789.",
  "pii_types": ["email", "name", "phone", "ssn"],
  "confidence_threshold": 0.7,
  "include_context": true
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "pii_detected": [
      {
        "type": "name",
        "value": "John Doe",
        "confidence": 0.85,
        "severity": "LOW",
        "location": {
          "start": 8,
          "end": 16
        },
        "context": "Contact John Doe at john"
      },
      {
        "type": "email",
        "value": "john.doe@example.com",
        "confidence": 0.95,
        "severity": "MEDIUM",
        "location": {
          "start": 20,
          "end": 40
        }
      },
      {
        "type": "phone",
        "value": "555-123-4567",
        "confidence": 0.90,
        "severity": "MEDIUM",
        "location": {
          "start": 50,
          "end": 62
        }
      },
      {
        "type": "ssn",
        "value": "123-45-6789",
        "confidence": 0.98,
        "severity": "HIGH",
        "location": {
          "start": 75,
          "end": 86
        }
      }
    ],
    "summary": {
      "total_detections": 4,
      "severity_counts": {
        "HIGH": 1,
        "MEDIUM": 2,
        "LOW": 1
      }
    }
  },
  "metadata": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-24T10:30:00Z",
    "processing_time_ms": 45
  }
}`}</pre>
              </div>
            </Tab>

            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X POST http://localhost:30500/api/v1/pii/extract \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Contact John Doe at john.doe@example.com",
    "confidence_threshold": 0.7
  }'`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Mask PII */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Mask PII</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">PII:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/pii/mask</code>
          </div>

          <Tabs aria-label="PII Mask Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "string",              // Required: Text containing PII
  "mask_strategy": "token",      // Optional: "token", "redact", "hash"
  "pii_types": ["email", "..."]  // Optional: Specific types to mask
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "Email me at john.doe@example.com or call 555-1234",
  "mask_strategy": "token"
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "masked_text": "Email me at [EMAIL_1] or call [PHONE_1]",
    "token_map": {
      "EMAIL_1": {
        "type": "email",
        "original_value": "john.doe@example.com"
      },
      "PHONE_1": {
        "type": "phone",
        "original_value": "555-1234"
      }
    },
    "mask_id": "mask_xyz789"  // Use for unmasking
  },
  "metadata": {
    "request_id": "req_def456",
    "timestamp": "2026-01-24T10:31:00Z"
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Unmask PII */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Unmask PII</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">PII:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/pii/unmask</code>
          </div>

          <Tabs aria-label="PII Unmask Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "masked_text": "string",  // Required: Text with tokens
  "token_map": {},          // Required: Token to value mapping
  "mask_id": "string"       // Optional: ID from mask operation
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "masked_text": "Contact [NAME_1] at [EMAIL_1]",
  "token_map": {
    "NAME_1": {
      "type": "name",
      "original_value": "John Doe"
    },
    "EMAIL_1": {
      "type": "email",
      "original_value": "john.doe@example.com"
    }
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "unmasked_text": "Contact John Doe at john.doe@example.com",
    "tokens_replaced": 2
  },
  "metadata": {
    "request_id": "req_ghi789",
    "timestamp": "2026-01-24T10:32:00Z"
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Record Consent */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Record PII Consent</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">PII:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/pii/consent</code>
          </div>

          <Tabs aria-label="PII Consent Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "pii_type": "email",           // Required: Type of PII
  "pii_value": "john@ex.com",    // Required: PII value (will be hashed)
  "purpose": "marketing",        // Required: Purpose of processing
  "consent_given": true,         // Required: Consent status
  "expiry_date": "2027-01-24"    // Optional: Consent expiration
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "pii_type": "email",
  "pii_value": "john.doe@example.com",
  "purpose": "Translation services and AI processing",
  "consent_given": true,
  "expiry_date": "2027-01-24"
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "consent_id": "consent_abc123",
    "pii_type": "email",
    "pii_value_hash": "d4c3b2a1...",  // SHA-256 hash
    "purpose": "Translation services and AI processing",
    "consent_given": true,
    "consent_date": "2026-01-24T10:33:00Z",
    "expiry_date": "2027-01-24T00:00:00Z"
  },
  "metadata": {
    "request_id": "req_jkl012",
    "timestamp": "2026-01-24T10:33:00Z"
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Get Consent */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Get Consent Record</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">PII:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/pii/consent/:consent_id</code>
          </div>

          <Tabs aria-label="Get Consent Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "consent_id": "consent_abc123",
    "user_id": "user_123456",
    "organization_id": "org_789",
    "pii_type": "email",
    "purpose": "Translation services",
    "consent_given": true,
    "consent_date": "2026-01-24T10:33:00Z",
    "expiry_date": "2027-01-24T00:00:00Z",
    "withdrawal_date": null,
    "is_active": true
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X GET http://localhost:30500/api/v1/pii/consent/consent_abc123 \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
