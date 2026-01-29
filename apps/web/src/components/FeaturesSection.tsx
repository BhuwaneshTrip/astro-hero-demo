import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'PII Detection & Masking',
    description: 'Automatically identify and protect sensitive personal information across 12+ data types including emails, SSNs, credit cards, and more with intelligent masking.',
    icon: '🔒',
    scope: 'PII:w',
    features: ['Email & Phone Detection', 'SSN & Credit Cards', 'Address & DOB', 'Confidence Scoring'],
    color: 'primary',
  },
  {
    title: 'Secrets Scanning',
    description: 'Detect hardcoded credentials, API keys, OAuth tokens, and database URLs in code repositories with entropy-based analysis.',
    icon: '🔐',
    scope: 'SECRET:w',
    features: ['API Key Detection', 'AWS Keys', 'Private Keys', 'Entropy Analysis'],
    color: 'secondary',
  },
  {
    title: 'Multi-Language Translation',
    description: 'Translate content to 100+ languages while maintaining PII protection. Supports multiple translation policies and response formats.',
    icon: '🌐',
    scope: 'TRANS:w',
    features: ['100+ Languages', 'PII Protection', 'Custom Policies', 'Email Formatting'],
    color: 'success',
  },
  {
    title: 'Model Garden',
    description: 'Execute prompts across multiple AI models simultaneously. Compare responses, analyze consistency, and choose the best model for your needs.',
    icon: '🤖',
    scope: 'MODEL:w',
    features: ['Multi-Model Execution', 'Response Comparison', 'Custom Parameters', 'Azure Integration'],
    color: 'warning',
  },
  {
    title: 'Consistency Testing',
    description: 'Validate AI model reliability by running identical prompts multiple times and measuring response consistency with detailed analytics.',
    icon: '📊',
    scope: 'CNSTEST:w',
    features: ['Multiple Iterations', 'Consistency Scoring', 'Async Processing', 'Detailed Reports'],
    color: 'danger',
  },
  {
    title: 'Relevance Checking',
    description: 'Verify that AI-generated responses are relevant to the original question using advanced semantic analysis.',
    icon: '✓',
    scope: 'RELEV:w',
    features: ['Semantic Analysis', 'Threshold Config', 'Confidence Scoring', 'Fast Validation'],
    color: 'primary',
  },
  {
    title: 'Data Validation',
    description: 'Validate data against JSON schemas and compliance frameworks (GDPR, HIPAA, CCPA) with detailed error reporting.',
    icon: '✔️',
    scope: 'VALID:w',
    features: ['Schema Validation', 'Compliance Checks', 'Error Details', 'Template Library'],
    color: 'secondary',
  },
  {
    title: 'Intelligent Caching',
    description: 'Optimized performance with Redis-based caching. Track cache statistics and manage cache entries per organization.',
    icon: '⚡',
    scope: 'CACHE:r',
    features: ['Redis Backend', 'Hit/Miss Tracking', 'Organization Scoped', 'Cache Control'],
    color: 'success',
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 md:px-12 bg-gradient-to-b from-transparent via-gray-50 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Chip 
            variant="flat" 
            color="primary"
            className="mb-6 px-4 py-2 text-sm font-semibold"
          >
            ✨ Comprehensive Features
          </Chip>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            <span className="text-primary-600">Everything You Need</span> for{' '}
            <span className="text-gradient">AI Governance</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A complete suite of tools designed for enterprise-grade AI security, 
            data privacy, and compliance management
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="h-full bg-white backdrop-blur-sm border-2 border-transparent hover:border-primary-500/50 transition-all border-t-4 border-t-primary-500">
                <CardHeader className="flex-col items-start gap-3 p-6 pb-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-5xl">{feature.icon}</div>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      color={feature.color as any}
                      className="font-mono text-xs"
                    >
                      {feature.scope}
                    </Chip>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700">{feature.title}</h3>
                  </div>
                </CardHeader>
                <CardBody className="p-6 pt-3">
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-primary-500">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-primary-500 to-secondary-500 p-[2px] border-t-4 border-t-primary-500">
            <CardBody className="bg-white p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary-700">JWT-Based Authentication</h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                All endpoints are secured with JWT tokens and scope-based authorization. 
                Fine-grained permission control ensures that users only access what they need.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Chip variant="flat" color="primary">Secure by Default</Chip>
                <Chip variant="flat" color="secondary">Scope-Based Access</Chip>
                <Chip variant="flat" color="success">Rate Limited</Chip>
                <Chip variant="flat" color="warning">Audit Logged</Chip>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
