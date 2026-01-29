import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

const stats = [
  { value: '12+', label: 'PII Types Detected', icon: '🔍' },
  { value: '99.9%', label: 'API Uptime', icon: '⚡' },
  { value: '<50ms', label: 'Response Time', icon: '⏱️' },
  { value: '100+', label: 'Languages Supported', icon: '🌍' },
];

export default function StatsSection() {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="bg-white backdrop-blur-sm border-2 border-transparent hover:border-primary-500/50 transition-all border-t-4 border-t-primary-500">
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
