import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function ModelGardenEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <h2 className="text-2xl font-bold text-primary-700">Model Garden</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700 mb-2">
            Execute prompts across multiple AI models simultaneously and compare results.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Execute Across Models</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">MODEL:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/model-garden/execute</code>
          </div>

          <Tabs aria-label="Model Garden Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "prompt": "string",              // Required: Prompt to execute
  "models": [                      // Required: Array of model configs
    {
      "provider": "ollama",
      "model_name": "gpt-oss:120b-cloud",
      "parameters": {
        "temperature": 0.7,
        "max_tokens": 1000
      }
    }
  ],
  "compare_outputs": true          // Optional: Enable comparison
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "execution_id": "exec_abc123",
    "prompt": "Explain quantum computing",
    "results": [
      {
        "model": "gpt-oss:120b-cloud",
        "provider": "ollama",
        "response": "Quantum computing is...",
        "execution_time_ms": 1200,
        "token_count": 150
      }
    ],
    "comparison": {
      "similarity_score": 0.92,
      "avg_response_time_ms": 1200
    }
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
