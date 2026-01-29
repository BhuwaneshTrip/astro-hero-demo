import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function ConsistencyTestEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl font-bold text-primary-700">Consistency Testing</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Test AI model consistency by running the same prompt multiple times and analyzing response variations.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Create Consistency Test</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">CNSTEST:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/consistency-test</code>
          </div>

          <Tabs aria-label="Consistency Test Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "prompt": "string",              // Required: Prompt to test
  "iterations": 5,                 // Optional: Number of runs (default: 5)
  "ai_model": "gpt-oss:120b-cloud", // Optional: Model to test
  "temperature": 0.7,              // Optional: Temperature setting
  "max_tokens": 1000               // Optional: Max tokens
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "test_id": "test_abc123",
    "status": "queued",
    "message": "Consistency test queued. Check status with GET /api/v1/consistency-test/test_abc123"
  },
  "metadata": {
    "request_id": "req_test_001",
    "timestamp": "2026-01-24T12:00:00Z"
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
            <h3 className="text-xl font-bold text-primary-700">Get Test Status</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">CNSTEST:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/consistency-test/:test_id</code>
          </div>

          <Tabs aria-label="Test Status Tabs" color="primary">
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "test_id": "test_abc123",
    "status": "completed",
    "progress": 100,
    "prompt": "What is AI?",
    "iterations": 5,
    "results": {
      "responses": [
        "AI stands for Artificial Intelligence...",
        "Artificial Intelligence is...",
        // ... more responses
      ],
      "consistency_metrics": {
        "similarity_score": 0.87,
        "unique_responses": 3,
        "average_length": 156,
        "std_deviation": 12.4
      }
    },
    "completed_at": "2026-01-24T12:05:00Z"
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
