import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function DataEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📈</span>
            <h2 className="text-2xl font-bold text-primary-700">Data Analysis</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700">
            Analyze data for sensitive content, patterns, and compliance requirements.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Analyze Sensitive Data</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">DATA:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/data/analyze-sensitive</code>
          </div>

          <Tabs aria-label="Data Analysis Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "data": "string",                // Required: Data to analyze
  "analysis_types": [              // Optional: Types of analysis
    "pii", "secrets", "compliance"
  ]
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "analysis_id": "analysis_abc123",
    "pii_found": true,
    "secrets_found": false,
    "compliance_status": "compliant",
    "details": {
      "pii_types": ["email", "phone"],
      "risk_level": "MEDIUM"
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
