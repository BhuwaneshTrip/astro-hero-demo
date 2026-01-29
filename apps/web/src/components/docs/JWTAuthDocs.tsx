import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function JWTAuthDocs() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔐</span>
            <h2 className="text-2xl font-bold text-primary-700">JWT Authentication</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-4">
            All API endpoints (except <code className="bg-gray-800 text-white px-2 py-1 rounded text-sm">/health</code>) require JWT-based authentication. 
            The JWT token must be included in the Authorization header of every request.
          </p>
        </CardBody>
      </Card>

      {/* Header Format */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <h3 className="text-xl font-bold text-primary-700">Authorization Header</h3>
        </CardHeader>
        <CardBody>
          <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-white/80">// HTTP Header</div>
            <div>Authorization: Bearer &lt;JWT_TOKEN&gt;</div>
          </div>
          
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Replace <code>&lt;JWT_TOKEN&gt;</code> with your actual JWT token obtained from your authentication provider.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Token Structure */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <h3 className="text-xl font-bold text-primary-700">JWT Token Structure</h3>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="JWT Token Tabs" color="primary">
            <Tab key="claims" title="Required Claims">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "sub": "user_123456",        // User ID (required)
  "name": "John Doe",           // User name (optional)
  "email": "john@example.com",  // User email (optional)
  "scope": [                    // Permission scopes (required)
    "PII:r",
    "PII:w",
    "SECRET:w",
    "TRANS:w",
    "CNSTEST:w"
  ],
  "org": "org_789",            // Organization ID (optional)
  "iat": 1705449600,           // Issued at (Unix timestamp)
  "exp": 1705453200,           // Expiration (Unix timestamp)
  "iss": "https://auth.specit.ai",  // Issuer (optional)
  "aud": "specit-dpsec-api"    // Audience (optional)
}`}</pre>
              </div>
            </Tab>
            <Tab key="algorithm" title="Algorithms">
              <div className="mt-4 space-y-4">
                <div>
                  <Chip color="primary" variant="flat" className="mb-2">Supported</Chip>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><code className="bg-primary-100 px-2 py-1 rounded">HS256</code> - HMAC with SHA-256</li>
                    <li><code className="bg-primary-100 px-2 py-1 rounded">RS256</code> - RSA Signature with SHA-256 (Recommended)</li>
                  </ul>
                </div>
              </div>
            </Tab>
            <Tab key="example" title="Python Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`import jwt
import time

# Create JWT token
payload = {
    "sub": "user_123456",
    "name": "John Doe",
    "scope": ["PII:r", "PII:w", "TRANS:w"],
    "org": "org_789",
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600  # 1 hour
}

secret_key = "your-secret-key"
token = jwt.encode(payload, secret_key, algorithm="HS256")
print(token)`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Permission Scopes */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <h3 className="text-xl font-bold text-primary-700">Permission Scopes</h3>
        </CardHeader>
        <CardBody>
          <p className="text-gray-700 mb-4">
            Each endpoint requires specific scopes. Format: <code className="bg-primary-100 px-2 py-1 rounded">{'{RESOURCE}:{PERMISSION}'}</code>
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary-600 text-white border-b-2 border-primary-700">
                <tr>
                  <th className="text-left p-3 font-bold">Scope</th>
                  <th className="text-left p-3 font-bold">Permission</th>
                  <th className="text-left p-3 font-bold">Endpoints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['PII:r', 'Read PII data', 'GET /api/v1/pii/*'],
                  ['PII:w', 'Write PII operations', 'POST /api/v1/pii/*'],
                  ['SECRET:r', 'Read secrets scan', 'GET /api/v1/secrets/*'],
                  ['SECRET:w', 'Perform secrets scan', 'POST /api/v1/secrets/scan'],
                  ['TRANS:r', 'Read translations', 'GET /api/v1/translation/*'],
                  ['TRANS:w', 'Create translations', 'POST /api/v1/translation/translate'],
                  ['MODEL:r', 'Read model executions', 'GET /api/v1/model-garden/*'],
                  ['MODEL:w', 'Execute models', 'POST /api/v1/model-garden/execute'],
                  ['CNSTEST:r', 'Read consistency tests', 'GET /api/v1/consistency-test/*'],
                  ['CNSTEST:w', 'Create consistency tests', 'POST /api/v1/consistency-test'],
                  ['RELEV:r', 'Read relevance checks', 'GET /api/v1/relevance-check/*'],
                  ['RELEV:w', 'Perform relevance checks', 'POST /api/v1/relevance-check'],
                  ['VALID:r', 'Read validation results', 'GET /api/v1/validation/*'],
                  ['VALID:w', 'Validate data', 'POST /api/v1/validation/validate'],
                  ['DATA:r', 'Read data analysis', 'GET /api/v1/data/*'],
                  ['DATA:w', 'Analyze sensitive data', 'POST /api/v1/data/analyze-sensitive'],
                  ['CACHE:r', 'Read cache stats', 'GET /api/v1/cache/stats'],
                  ['CACHE:w', 'Clear cache', 'POST /api/v1/cache/clear']
                ].map(([scope, permission, endpoints]) => (
                  <tr key={scope} className="hover:bg-primary-50">
                    <td className="p-3">
                      <Chip size="sm" color="primary" variant="flat" className="font-mono">{scope}</Chip>
                    </td>
                    <td className="p-3 text-gray-700">{permission}</td>
                    <td className="p-3">
                      <code className="text-xs bg-gray-800 text-white px-2 py-1 rounded">{endpoints}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Error Responses */}
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <h3 className="text-xl font-bold text-primary-700">Authentication Errors</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Chip size="sm" color="danger">401</Chip>
                <span className="font-semibold text-gray-900">Missing Token</span>
              </div>
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "success": false,
  "error": "Missing authentication token",
  "error_code": "MISSING_TOKEN"
}`}</pre>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Chip size="sm" color="danger">401</Chip>
                <span className="font-semibold text-gray-900">Invalid/Expired Token</span>
              </div>
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "success": false,
  "error": "Invalid token: Signature has expired",
  "error_code": "TOKEN_EXPIRED"
}`}</pre>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Chip size="sm" color="danger">403</Chip>
                <span className="font-semibold text-gray-900">Insufficient Permissions</span>
              </div>
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "success": false,
  "error": "Insufficient permissions",
  "required_scopes": ["PII:w"],
  "user_scopes": ["PII:r"]
}`}</pre>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
