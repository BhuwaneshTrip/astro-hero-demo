import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function SecretsEndpointsDocs() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔑</span>
            <h2 className="text-2xl font-bold text-primary-700">Secrets Scanning</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Detect hardcoded secrets, API keys, and credentials in code and text using pattern matching and entropy analysis.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" color="primary" variant="flat">15+ Secret Types</Chip>
            <Chip size="sm" color="success" variant="flat">Entropy Analysis</Chip>
            <Chip size="sm" color="secondary" variant="flat">Provider Detection</Chip>
          </div>
        </CardBody>
      </Card>

      {/* Scan Secrets */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Scan for Secrets</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">SECRET:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/secrets/scan</code>
          </div>

          <Tabs aria-label="Secrets Scan Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "content": "string",              // Required: Code/text to scan
  "secret_types": ["api_key", ...], // Optional: Specific types to detect
  "enable_entropy_check": true,     // Optional: Enable entropy analysis
  "min_entropy": 4.5                // Optional: Minimum entropy threshold
}`}</pre>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Supported Secret Types:</h4>
                <div className="flex gap-2 flex-wrap">
                  {['api_key', 'aws_key', 'azure_key', 'github_token', 'jwt', 
                    'private_key', 'oauth_token', 'database_url', 'password',
                    'webhook_secret', 'encryption_key', 'slack_token', 
                    'stripe_key', 'google_api', 'firebase_key'].map(type => (
                    <Chip key={type} size="sm" variant="bordered">{type}</Chip>
                  ))}
                </div>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "content": "const API_KEY = 'sk_test_XXXXXXXXXXXXXXXXXXXXXX';\\nconst AWS_SECRET = 'XXXXXXXXXXXXXXXXXXXXXXXX';",
  "enable_entropy_check": true,
  "min_entropy": 4.5
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "secrets_found": [
      {
        "type": "stripe_api_key",
        "value": "sk_live_4eC39HqLyjW***",  // Partially masked
        "line_number": 1,
        "column_start": 16,
        "column_end": 52,
        "severity": "CRITICAL",
        "confidence": 0.98,
        "entropy": 5.2,
        "provider": "Stripe",
        "context": "const API_KEY = 'sk_live_...'",
        "remediation": "Remove hardcoded key and use environment variables"
      },
      {
        "type": "aws_secret_key",
        "value": "wJalrXUtnFEMI/K7***",
        "line_number": 2,
        "column_start": 19,
        "column_end": 59,
        "severity": "CRITICAL",
        "confidence": 0.95,
        "entropy": 5.8,
        "provider": "AWS",
        "context": "const AWS_SECRET = 'wJalr...'",
        "remediation": "Use AWS IAM roles or AWS Secrets Manager"
      }
    ],
    "summary": {
      "total_secrets": 2,
      "severity_counts": {
        "CRITICAL": 2,
        "HIGH": 0,
        "MEDIUM": 0,
        "LOW": 0
      },
      "average_entropy": 5.5,
      "providers_detected": ["Stripe", "AWS"]
    }
  },
  "metadata": {
    "request_id": "req_secrets_001",
    "timestamp": "2026-01-24T11:00:00Z",
    "processing_time_ms": 67
  }
}`}</pre>
              </div>
            </Tab>

            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X POST http://localhost:30500/api/v1/secrets/scan \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "API_KEY=sk_live_abc123xyz789",
    "enable_entropy_check": true
  }'`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Get Secret Types */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">List Secret Types</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">SECRET:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/secrets/types</code>
          </div>

          <Tabs aria-label="Secret Types Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "secret_types": [
      {
        "type": "api_key",
        "description": "Generic API key",
        "severity": "HIGH",
        "pattern_example": "api_key=abc123..."
      },
      {
        "type": "aws_access_key",
        "description": "AWS Access Key ID",
        "severity": "CRITICAL",
        "pattern_example": "AKIA..."
      },
      {
        "type": "github_token",
        "description": "GitHub Personal Access Token",
        "severity": "CRITICAL",
        "pattern_example": "ghp_..."
      }
      // ... more types
    ],
    "total_types": 15
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X GET http://localhost:30500/api/v1/secrets/types \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Entropy Analysis */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Entropy Analysis</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">SECRET:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/secrets/entropy-analysis</code>
          </div>

          <Tabs aria-label="Entropy Analysis Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "string",           // Required: Text to analyze
  "threshold": 4.5            // Optional: Entropy threshold
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "text": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  "threshold": 4.5
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "entropy": 5.82,
    "risk_level": "HIGH",
    "analysis": {
      "character_diversity": 0.89,
      "length": 40,
      "contains_mixed_case": true,
      "contains_special_chars": true,
      "contains_numbers": false
    },
    "interpretation": "High entropy detected. This appears to be a secret or randomly generated string.",
    "recommendation": "If this is a secret, store it securely using environment variables or a secrets manager."
  },
  "metadata": {
    "request_id": "req_entropy_001",
    "timestamp": "2026-01-24T11:05:00Z"
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
          
          <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">Entropy Scoring Guide:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>High Risk (entropy &gt; 4.5):</strong> Likely a secret or random string</li>
              <li><strong>Medium Risk (3.5 - 4.5):</strong> Potentially sensitive data</li>
              <li><strong>Low Risk (&lt; 3.5):</strong> Normal text or low-entropy string</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
