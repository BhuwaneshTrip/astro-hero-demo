import { Chip } from '@heroui/react';

interface ApiSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function ApiSidebar({ activeSection, onSectionChange }: ApiSidebarProps) {
  const sections = [
    {
      id: 'jwt-auth',
      title: 'JWT Authentication',
      icon: '🔐',
      category: 'Authentication'
    },
    {
      id: 'pii-endpoints',
      title: 'PII Endpoints',
      icon: '🔒',
      category: 'Endpoints',
      scope: 'PII:w'
    },
    {
      id: 'secrets-endpoints',
      title: 'Secrets Scanning',
      icon: '🔑',
      category: 'Endpoints',
      scope: 'SECRET:w'
    },
    {
      id: 'translation-endpoints',
      title: 'Translation',
      icon: '🌐',
      category: 'Endpoints',
      scope: 'TRANS:w'
    },
    {
      id: 'model-garden-endpoints',
      title: 'Model Garden',
      icon: '🤖',
      category: 'Endpoints',
      scope: 'MODEL:w'
    },
    {
      id: 'consistency-endpoints',
      title: 'Consistency Testing',
      icon: '📊',
      category: 'Endpoints',
      scope: 'CNSTEST:w'
    },
    {
      id: 'relevance-endpoints',
      title: 'Relevance Checking',
      icon: '✓',
      category: 'Endpoints',
      scope: 'RELEV:w'
    },
    {
      id: 'validation-endpoints',
      title: 'Data Validation',
      icon: '✔️',
      category: 'Endpoints',
      scope: 'VALID:w'
    },
    {
      id: 'data-endpoints',
      title: 'Data Analysis',
      icon: '📈',
      category: 'Endpoints',
      scope: 'DATA:w'
    },
    {
      id: 'cache-endpoints',
      title: 'Cache Management',
      icon: '⚡',
      category: 'Endpoints',
      scope: 'CACHE:r'
    }
  ];

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, typeof sections>);

  return (
    <div className="p-6">
      <div className="mb-8">
        <a href="/hero" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </a>
      </div>

      {Object.entries(groupedSections).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
            {category}
          </h3>
          <div className="space-y-1">
            {items.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{section.title}</div>
                  {section.scope && (
                    <div className="text-xs opacity-75 font-mono">{section.scope}</div>
                  )}
                </div>
                {activeSection === section.id && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
