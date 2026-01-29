import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function CacheEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-bold text-primary-700">Cache Management</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700">
            Monitor and manage API response caching for improved performance.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Get Cache Statistics</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">CACHE:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/cache/stats</code>
          </div>

          <Tabs aria-label="Cache Stats Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "hit_rate": 0.85,
    "miss_rate": 0.15,
    "total_keys": 1247,
    "memory_usage_mb": 45.7,
    "eviction_count": 23,
    "avg_ttl_seconds": 3600
  }
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="curl" title="cURL Example">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`curl -X GET http://localhost:30500/api/v1/cache/stats \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Clear Cache</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">CACHE:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/cache/clear</code>
          </div>

          <Tabs aria-label="Clear Cache Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "cache_type": "all",             // Optional: "all", "translation", "prompt"
  "organization_id": "org_789"     // Optional: Clear org-specific cache
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "keys_cleared": 157,
    "cache_type": "translation",
    "timestamp": "2026-01-24T12:30:00Z"
  }
}`}</pre>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Cache Health Check</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">CACHE:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/cache/health</code>
          </div>

          <Tabs aria-label="Cache Health Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "status": "healthy",
    "redis_connected": true,
    "latency_ms": 2.3,
    "memory_available": true
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
