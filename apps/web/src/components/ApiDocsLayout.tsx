import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiSidebar from './ApiSidebar';
import JWTAuthDocs from './docs/JWTAuthDocs.tsx';
import PIIEndpointsDocs from './docs/PIIEndpointsDocs.tsx';
import SecretsEndpointsDocs from './docs/SecretsEndpointsDocs.tsx';
import TranslationEndpointsDocs from './docs/TranslationEndpointsDocs.tsx';
import ModelGardenEndpointsDocs from './docs/ModelGardenEndpointsDocs.tsx';
import ConsistencyTestEndpointsDocs from './docs/ConsistencyTestEndpointsDocs.tsx';
import RelevanceCheckEndpointsDocs from './docs/RelevanceCheckEndpointsDocs.tsx';
import ValidationEndpointsDocs from './docs/ValidationEndpointsDocs.tsx';
import DataEndpointsDocs from './docs/DataEndpointsDocs.tsx';
import CacheEndpointsDocs from './docs/CacheEndpointsDocs.tsx';

export default function ApiDocsLayout() {
  const [activeSection, setActiveSection] = useState('jwt-auth');

  const renderDocSection = () => {
    switch (activeSection) {
      case 'jwt-auth':
        return <JWTAuthDocs />;
      case 'pii-endpoints':
        return <PIIEndpointsDocs />;
      case 'secrets-endpoints':
        return <SecretsEndpointsDocs />;
      case 'translation-endpoints':
        return <TranslationEndpointsDocs />;
      case 'model-garden-endpoints':
        return <ModelGardenEndpointsDocs />;
      case 'consistency-endpoints':
        return <ConsistencyTestEndpointsDocs />;
      case 'relevance-endpoints':
        return <RelevanceCheckEndpointsDocs />;
      case 'validation-endpoints':
        return <ValidationEndpointsDocs />;
      case 'data-endpoints':
        return <DataEndpointsDocs />;
      case 'cache-endpoints':
        return <CacheEndpointsDocs />;
      default:
        return <JWTAuthDocs />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r-4 border-r-primary-500 fixed h-screen overflow-y-auto">
        <ApiSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="ml-80 flex-1 p-8">
        <div className="max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">📚</div>
              <h1 className="text-4xl font-bold text-gray-900">
                <span className="text-primary-600">API</span> Documentation
              </h1>
            </div>
            <p className="text-lg text-gray-700">
              Complete reference for all AI Governance DPSEC API endpoints, authentication, and usage examples.
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderDocSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
