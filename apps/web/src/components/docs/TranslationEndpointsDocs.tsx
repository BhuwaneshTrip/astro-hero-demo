import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function TranslationEndpointsDocs() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌐</span>
            <h2 className="text-2xl font-bold text-primary-700">Translation Services</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Translate text across 100+ languages with PII protection, policy-based formatting, and intelligent caching.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" color="primary" variant="flat">100+ Languages</Chip>
            <Chip size="sm" color="success" variant="flat">PII Protected</Chip>
            <Chip size="sm" color="secondary" variant="flat">Policy-Based</Chip>
          </div>
        </CardBody>
      </Card>

      {/* Translate Text */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Translate Text</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">TRANS:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/translation/translate</code>
          </div>

          <Tabs aria-label="Translation Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "input_text": "string",           // Required: Text to translate
  "source_language": "en",           // Required: Source language code
  "target_languages": [              // Required: Array of target configs
    {
      "language": "Spanish",
      "language_code": "es",
      "policy": "formal_business"    // Optional: Translation policy
    }
  ],
  "response_format": "document",     // Optional: Output format
  "preserve_pii": true,              // Optional: Mask/unmask PII
  "attachment": {                    // Optional: File attachment
    "content": "base64_string",
    "filename": "document.pdf"
  }
}`}</pre>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Translation Policies:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['formal_business', 'casual', 'technical', 'marketing'].map(policy => (
                      <Chip key={policy} size="sm" variant="bordered">{policy}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response Formats:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['email', 'document', 'chat', 'raw'].map(format => (
                      <Chip key={format} size="sm" variant="bordered">{format}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "input_text": "Hello, please contact our team at support@example.com for assistance.",
  "source_language": "en",
  "target_languages": [
    {
      "language": "Spanish",
      "language_code": "es",
      "policy": "formal_business"
    },
    {
      "language": "French",
      "language_code": "fr",
      "policy": "formal_business"
    }
  ],
  "response_format": "document",
  "preserve_pii": true
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "translation_id": "trans_abc123",
    "source_language": "en",
    "translations": {
      "es": {
        "translated_text": "Hola, póngase en contacto con nuestro equipo en support@example.com para obtener asistencia.",
        "language": "Spanish",
        "language_code": "es",
        "policy_applied": "formal_business",
        "cache_hit": false,
        "translation_time_ms": 1250
      },
      "fr": {
        "translated_text": "Bonjour, veuillez contacter notre équipe à support@example.com pour obtenir de l'aide.",
        "language": "French",
        "language_code": "fr",
        "policy_applied": "formal_business",
        "cache_hit": false,
        "translation_time_ms": 1180
      }
    },
    "pii_detected": [
      {
        "type": "email",
        "value": "support@example.com",
        "preserved": true
      }
    ],
    "response_format": "document",
    "total_translation_time_ms": 2430
  },
  "metadata": {
    "request_id": "req_trans_001",
    "timestamp": "2026-01-24T11:15:00Z",
    "processing_time_ms": 2450
  }
}`}</pre>
              </div>
            </Tab>

            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X POST http://localhost:30500/api/v1/translation/translate \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input_text": "Hello, how are you?",
    "source_language": "en",
    "target_languages": [
      {
        "language": "Spanish",
        "language_code": "es"
      }
    ]
  }'`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Get User Translations */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Get User Translations</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">TRANS:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/translation/user/translations?page=1&limit=10</code>
          </div>

          <Tabs aria-label="User Translations Tabs" color="primary">
            <Tab key="params" title="Query Parameters">
              <div className="mt-4">
                <table className="w-full text-sm">
                  <thead className="bg-primary-600 text-white">
                    <tr>
                      <th className="text-left p-3 font-bold">Parameter</th>
                      <th className="text-left p-3 font-bold">Type</th>
                      <th className="text-left p-3 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3"><code>page</code></td>
                      <td className="p-3">integer</td>
                      <td className="p-3">Page number (default: 1)</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code>limit</code></td>
                      <td className="p-3">integer</td>
                      <td className="p-3">Results per page (default: 10, max: 100)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "translations": [
      {
        "id": "trans_abc123",
        "input_text": "Hello, how are you?",
        "source_language": "en",
        "target_languages": ["es", "fr"],
        "created_at": "2026-01-24T11:15:00Z",
        "cache_hit": false
      },
      {
        "id": "trans_xyz789",
        "input_text": "Thank you for your order",
        "source_language": "en",
        "target_languages": ["de", "it"],
        "created_at": "2026-01-23T09:30:00Z",
        "cache_hit": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 47,
      "total_pages": 5
    }
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X GET "http://localhost:30500/api/v1/translation/user/translations?page=1&limit=10" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Get Translation by ID */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Get Translation Details</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">TRANS:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/translation/:translation_id</code>
          </div>

          <Tabs aria-label="Translation Details Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "id": "trans_abc123",
    "user_id": "user_123456",
    "organization_id": "org_789",
    "input_text": "Hello, how are you?",
    "source_language": "en",
    "translations": {
      "es": {
        "translated_text": "Hola, ¿cómo estás?",
        "language": "Spanish",
        "policy_applied": "casual"
      }
    },
    "pii_detected": [],
    "cache_hit": false,
    "created_at": "2026-01-24T11:15:00Z"
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X GET http://localhost:30500/api/v1/translation/trans_abc123 \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* List Policies */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">List Translation Policies</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">TRANS:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/translation/policies</code>
          </div>

          <Tabs aria-label="Policies Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "policies": [
      {
        "id": "formal_business",
        "name": "Formal Business",
        "description": "Professional tone with formal grammar",
        "use_cases": ["Business emails", "Official documents"]
      },
      {
        "id": "casual",
        "name": "Casual",
        "description": "Conversational tone",
        "use_cases": ["Chat messages", "Informal communication"]
      },
      {
        "id": "technical",
        "name": "Technical",
        "description": "Preserves technical terms and jargon",
        "use_cases": ["Documentation", "Technical specs"]
      },
      {
        "id": "marketing",
        "name": "Marketing",
        "description": "Persuasive and engaging language",
        "use_cases": ["Marketing content", "Promotional material"]
      }
    ]
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* List Formats */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">List Response Formats</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">TRANS:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/translation/formats</code>
          </div>

          <Tabs aria-label="Formats Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "formats": [
      {
        "id": "email",
        "name": "Email",
        "description": "Formats translation as email with subject/body",
        "structure": "Subject: [subject]\\n\\nBody: [body]"
      },
      {
        "id": "document",
        "name": "Document",
        "description": "Formal document structure",
        "structure": "Structured paragraphs"
      },
      {
        "id": "chat",
        "name": "Chat",
        "description": "Conversational format",
        "structure": "Natural conversation flow"
      },
      {
        "id": "raw",
        "name": "Raw",
        "description": "Plain text without formatting",
        "structure": "Unformatted text"
      }
    ]
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
