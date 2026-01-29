import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function RelevanceCheckEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✓</span>
            <h2 className="text-2xl font-bold text-primary-700">Relevance Checking</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Verify if AI responses are relevant and aligned with the input question or context.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Check Response Relevance</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">RELEV:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/relevance-check</code>
          </div>

          <Tabs aria-label="Relevance Check Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "question": "string",            // Required: Original question
  "response": "string",            // Required: AI response to check
  "context": "string"              // Optional: Additional context
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="sample-input" title="Sample Input">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "question": "What is the capital of France?",
  "response": "Paris is the capital city of France, located in the north-central part of the country."
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "check_id": "relev_abc123",
    "relevance_score": 0.95,
    "relevance_status": "HIGHLY_RELEVANT",
    "analysis": {
      "directly_answers": true,
      "contains_keywords": ["Paris", "capital", "France"],
      "semantic_similarity": 0.93,
      "completeness": 0.97
    },
    "explanation": "Response directly answers the question with accurate information."
  },
  "metadata": {
    "request_id": "req_relev_001",
    "timestamp": "2026-01-24T12:10:00Z",
    "processing_time_ms": 234
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
            <h3 className="text-xl font-bold text-primary-700">Get User's Checks</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="success" variant="flat">GET</Chip>
              <Chip size="sm" variant="flat">RELEV:r</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">GET /api/v1/relevance-check/user/checks</code>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
