import { Card, CardBody, CardHeader, Chip, Tabs, Tab } from '@heroui/react';

export default function ValidationEndpointsDocs() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-primary-500">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✔️</span>
            <h2 className="text-2xl font-bold text-primary-700">Data Validation</h2>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <p className="text-gray-700">
            Validate data against schemas and rules to ensure data quality and compliance.
          </p>
        </CardBody>
      </Card>

      <Card className="border-t-4 border-t-primary-500">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-primary-700">Validate Data</h3>
            <div className="flex gap-2">
              <Chip size="sm" color="primary" variant="flat">POST</Chip>
              <Chip size="sm" variant="flat">VALID:w</Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm block">POST /api/v1/validation/validate</code>
          </div>

          <Tabs aria-label="Validation Tabs" color="primary">
            <Tab key="payload" title="Request Payload">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "data": {},                      // Required: Data to validate
  "schema": {},                    // Required: Validation schema
  "rules": []                      // Optional: Additional rules
}`}</pre>
              </div>
            </Tab>
            
            <Tab key="response" title="Sample Response">
              <div className="bg-primary-600 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto mt-4">
                <pre>{`{
  "success": true,
  "data": {
    "valid": true,
    "errors": [],
    "warnings": []
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
