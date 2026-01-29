import { Button, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-white border-b-4 border-b-primary-500 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🛡️</div>
            <h1 className="text-xl font-bold">
              <span className="text-primary-600">AI Governance</span> DPSEC
            </h1>
          </div>
          <Button
            as="a"
            href="/docs"
            variant="flat"
            color="primary"
            className="font-semibold"
          >
            📚 Documentation
          </Button>
        </div>
      </nav>

      <div className="px-6 py-20 md:px-12 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Chip 
                variant="flat" 
                color="primary"
                className="px-4 py-2 text-sm font-semibold"
              >
                🚀 Enterprise-Grade AI Governance
              </Chip>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900"
            >
              <span className="text-primary-600">Secure Your AI</span> with{' '}
              <span className="text-gradient">
                Data Privacy & Security
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
            >
              The complete API platform for AI governance. Detect PII, scan secrets, 
              translate with protection, and validate AI responses across multiple models.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                color="primary"
                className="font-semibold px-8"
                radius="full"
                as="a"
                href="/docs"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="font-semibold px-8"
                radius="full"
                as="a"
                href="/docs"
              >
                View Documentation
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl text-primary-600">✓</span>
                <span className="text-sm font-medium text-gray-700">
                  JWT Authentication
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-primary-600">✓</span>
                <span className="text-sm font-medium text-gray-700">
                  GDPR & HIPAA Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-primary-600">✓</span>
                <span className="text-sm font-medium text-gray-700">
                  Real-time Processing
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid gap-4">
              {/* Top Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="gradient-border bg-white backdrop-blur-lg border-t-4 border-t-primary-500">
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-primary-100">
                        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">PII Detection</h3>
                        <p className="text-sm text-gray-600">
                          Identify and extract 12+ types of personally identifiable information with confidence scores
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              {/* Middle Cards Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="gradient-border bg-white backdrop-blur-lg h-full border-t-4 border-t-primary-500">
                    <CardBody className="p-6">
                      <div className="p-3 rounded-2xl bg-secondary-100 w-fit mb-4">
                        <svg className="w-8 h-8 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-primary-700">Secrets Scanning</h3>
                      <p className="text-sm text-gray-600">
                        Detect hardcoded credentials and API keys
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="gradient-border bg-white backdrop-blur-lg h-full border-t-4 border-t-primary-500">
                    <CardBody className="p-6">
                      <div className="p-3 rounded-2xl bg-purple-100 w-fit mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-primary-700">Translation Services</h3>
                      <p className="text-sm text-gray-600">
                        Multi-language translation with PII masking
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>

              {/* Bottom Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="gradient-border bg-white backdrop-blur-lg border-t-4 border-t-primary-500">
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-green-100">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">Model Garden</h3>
                        <p className="text-sm text-gray-600">
                          Execute and compare prompts across multiple AI models with consistency testing
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
