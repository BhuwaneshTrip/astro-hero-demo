import { Button, Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="px-6 py-20 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-primary-500 via-secondary-500 to-purple-600 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <CardBody className="p-12 md:p-16 relative z-10">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-block text-6xl mb-4"
                >
                  🚀
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Secure Your AI?
                </h2>

                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                  Start using the AI Governance DPSEC API today and protect your data 
                  with enterprise-grade security and compliance tools.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Button
                    size="lg"
                    className="bg-white text-primary-600 font-bold px-10 hover:bg-gray-100"
                    radius="full"
                    as="a"
                    href="/api"
                  >
                    Get API Access
                  </Button>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-white text-white font-bold px-10 hover:bg-white/10"
                    radius="full"
                    as="a"
                    href="/docs"
                  >
                    Read Documentation
                  </Button>
                </div>

                <div className="pt-8 flex flex-wrap justify-center gap-8 text-white/80">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Free developer tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">24/7 support</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
