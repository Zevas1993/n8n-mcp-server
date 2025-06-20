/**
 * Final Complete n8n Node Catalog
 * 
 * This is the definitive n8n node catalog that includes:
 * - Properly structured nodes matching real n8n implementation
 * - Complete search functionality replicating browser experience  
 * - All node properties, operations, and metadata
 * - Real-time search and filtering capabilities
 */

import { NodeTypeInfo, SearchFilters, SearchResult } from './node-types.js';
import { N8NSearchEngine, createN8NSearchEngine } from './n8n-search-engine.js';

// Import enhanced node implementations
import { httpRequestNodeComplete } from './nodes/enhanced-http-request-node.js';
import { githubNodeComplete } from './nodes/enhanced-github-node.js';

// Import AI-optimized enhanced nodes
import { slackNodeEnhanced } from './nodes/enhanced-slack-node.js';
import { openaiNodeEnhanced } from './nodes/enhanced-openai-node.js';
import { githubNodeEnhancedV2 } from './nodes/enhanced-github-v2-node.js';

// Import real structured nodes (updated to match actual n8n structure)
import { slackNode } from './nodes/slack-node-real.js';
import { openaiNodes } from './nodes/openai-node.js';
import { codeNode } from './nodes/code-node.js';
import { webhookNode } from './nodes/webhook-node.js';
import { twitterNode } from './nodes/twitter-node.js';
import { youtubeNode } from './nodes/youtube-node.js';
import { clickupNode } from './nodes/clickup-node.js';
import { scheduleNodes } from './nodes/schedule-trigger-node.js';
import { claudeNode } from './nodes/claude-node.js';
import { facebookNode } from './nodes/facebook-node.js';
import { gmailNode } from './nodes/gmail-node-real.js';

// Import real core utility nodes (updated to match actual n8n structure)
import { ifNode } from './nodes/if-node-real.js';
import { setNode } from './nodes/set-node-real.js';
import { mergeNode } from './nodes/merge-node.js';
import { functionNode } from './nodes/function-node.js';
import { switchNode } from './nodes/switch-node.js';

// Import LangChain nodes
import { langchainOpenAINode } from './nodes/langchain-openai-node.js';
import { langchainChainLlmNode } from './nodes/langchain-chain-llm-node.js';
import { langchainOutputParserNode } from './nodes/langchain-output-parser-node.js';
import { langchainTextClassifierNode } from './nodes/langchain-text-classifier-node.js';

// Core nodes with proper n8n structure
export const ENHANCED_CORE_NODES: NodeTypeInfo[] = [
  httpRequestNodeComplete,
  codeNode,
  webhookNode,
  ...scheduleNodes,
  
  // Enhanced core utility nodes
  ifNode,
  setNode,
  mergeNode,
  functionNode,
  switchNode,
  
  // LangChain nodes for AI workflows
  langchainOpenAINode,
  langchainChainLlmNode,
  langchainOutputParserNode,
  langchainTextClassifierNode,
  
  // Manual Trigger (properly structured)
  {
    name: 'n8n-nodes-base.manualTrigger',
    displayName: 'Manual Trigger',
    description: 'Manually triggers the workflow execution',
    category: 'Core',
    subcategory: 'Trigger',
    properties: [
      {
        name: 'executionsLimit',
        displayName: 'Executions Limit',
        type: 'number',
        required: false,
        default: 0,
        description: 'Maximum number of executions (0 = unlimited)'
      }
    ],
    inputs: [],
    outputs: [
      {
        type: 'main',
        displayName: 'Output',
        description: 'Manual trigger output'
      }
    ],
    triggerNode: true,
    version: [1],
    defaults: { name: 'When clicking \'Test workflow\'' },
    aliases: ['manual', 'test', 'start', 'begin'],
    subtitle: '',
    examples: [
      {
        name: 'Start Workflow Manually',
        description: 'Begin workflow execution with manual trigger',
        workflow: {
          nodes: [
            {
              name: 'Manual Trigger',
              type: 'n8n-nodes-base.manualTrigger',
              parameters: {}
            }
          ]
        }
      }
    ]
  }
];

// Enhanced app integration nodes (properly structured)  
export const ENHANCED_APP_NODES: NodeTypeInfo[] = [
  // AI-optimized enhanced nodes (preferred for AI agents)
  slackNodeEnhanced,
  openaiNodeEnhanced,
  githubNodeEnhancedV2,
  
  // Original enhanced nodes
  githubNodeComplete,
  
  // Other working nodes
  twitterNode,
  youtubeNode,
  facebookNode,
  clickupNode,
  claudeNode,
  gmailNode,
  
  // Keep legacy nodes that export arrays
  ...openaiNodes
];

// All enhanced nodes combined
export const ALL_COMPLETE_NODES: NodeTypeInfo[] = [
  ...ENHANCED_CORE_NODES,
  ...ENHANCED_APP_NODES
];

// Enhanced catalog with search capabilities
export class CompleteN8NCatalog {
  private nodes: NodeTypeInfo[];
  private searchEngine: N8NSearchEngine;
  private categories: Map<string, NodeTypeInfo[]>;

  constructor() {
    this.nodes = ALL_COMPLETE_NODES;
    this.searchEngine = createN8NSearchEngine(this.nodes);
    this.categories = this.buildCategories();
  }

  /**
   * Search nodes - replicates n8n browser search exactly
   */
  search(query: string = '', filters: SearchFilters = {}): SearchResult[] {
    return this.searchEngine.search({
      query,
      ...filters
    });
  }

  /**
   * Get search suggestions for auto-complete
   */
  getSuggestions(partialQuery: string): string[] {
    return this.searchEngine.getSuggestions(partialQuery);
  }

  /**
   * Get nodes by category (for organized browsing)
   */
  getNodesByCategory(): Map<string, NodeTypeInfo[]> {
    return this.searchEngine.getNodesByCategory();
  }

  /**
   * Get popular/featured nodes
   */
  getPopularNodes(): NodeTypeInfo[] {
    return this.searchEngine.getPopularNodes();
  }

  /**
   * Get trigger nodes only
   */
  getTriggerNodes(): NodeTypeInfo[] {
    return this.searchEngine.getTriggerNodes();
  }

  /**
   * Get node recommendations based on workflow context
   */
  getRecommendations(currentNodes: string[]): NodeTypeInfo[] {
    return this.searchEngine.getRecommendations(currentNodes);
  }

  /**
   * Get a specific node by name
   */
  getNode(name: string): NodeTypeInfo | undefined {
    return this.nodes.find(node => node.name === name);
  }

  /**
   * Get all nodes
   */
  getAllNodes(): NodeTypeInfo[] {
    return this.nodes;
  }

  /**
   * Get catalog statistics
   */
  getStats() {
    const stats = {
      totalNodes: this.nodes.length,
      nodesByCategory: {} as Record<string, number>,
      nodesByType: {
        trigger: 0,
        regular: 0,
        webhook: 0
      },
      popularNodes: this.getPopularNodes().length,
      lastUpdated: new Date().toISOString()
    };

    // Count by category
    this.categories.forEach((nodes, category) => {
      stats.nodesByCategory[category] = nodes.length;
    });

    // Count by type
    this.nodes.forEach(node => {
      if (node.triggerNode) stats.nodesByType.trigger++;
      if (node.regularNode) stats.nodesByType.regular++;
      if (node.webhookSupport) stats.nodesByType.webhook++;
    });

    return stats;
  }

  /**
   * Build category map
   */
  private buildCategories(): Map<string, NodeTypeInfo[]> {
    const categories = new Map<string, NodeTypeInfo[]>();
    
    this.nodes.forEach(node => {
      if (!categories.has(node.category)) {
        categories.set(node.category, []);
      }
      categories.get(node.category)!.push(node);
    });

    return categories;
  }

  /**
   * Export for external APIs
   */
  export() {
    return {
      version: '3.0.0',
      nodes: this.nodes,
      categories: Array.from(this.categories.keys()),
      stats: this.getStats(),
      searchCapabilities: {
        textSearch: true,
        categoryFiltering: true,
        typeFiltering: true,
        suggestions: true,
        recommendations: true
      }
    };
  }
}

// Create singleton instance
export const completeN8NCatalog = new CompleteN8NCatalog();

// Quick access exports
export const searchNodes = (query: string, filters?: SearchFilters) => 
  completeN8NCatalog.search(query, filters);

export const getNodesByCategory = () => 
  completeN8NCatalog.getNodesByCategory();

export const getPopularNodes = () => 
  completeN8NCatalog.getPopularNodes();

export const getTriggerNodes = () => 
  completeN8NCatalog.getTriggerNodes();

export const getNode = (name: string) => 
  completeN8NCatalog.getNode(name);

export const getSuggestions = (partialQuery: string) => 
  completeN8NCatalog.getSuggestions(partialQuery);

export const getRecommendations = (currentNodes: string[]) => 
  completeN8NCatalog.getRecommendations(currentNodes);

// Default export
export default completeN8NCatalog;

// Export for compatibility
export { ALL_COMPLETE_NODES as ALL_N8N_NODES };
export { ENHANCED_CORE_NODES as CORE_NODES };
export { ENHANCED_APP_NODES as APP_INTEGRATION_NODES };

// Summary of what we've built
export const CATALOG_SUMMARY = {
  version: '3.0.0',
  description: 'Complete n8n node catalog with real search functionality',
  features: [
    'Real-time search matching n8n browser experience',
    'Properly structured nodes with complete properties',
    'Dynamic subtitles and conditional field display',
    'Resource locators and load options methods',
    'Category-based browsing and filtering',
    'Search suggestions and auto-complete',
    'Node recommendations based on workflow context',
    'Popular nodes identification and boosting',
    'Complete examples and usage patterns'
  ],
  totalNodes: ALL_COMPLETE_NODES.length,
  searchEngineFeatures: [
    'Multi-field indexing (name, description, aliases, operations)',
    'Relevance scoring with popularity boost',
    'Fuzzy matching and partial search',
    'Category and type filtering',
    'Real-time suggestions',
    'Context-aware recommendations'
  ],
  nodeStructure: [
    'Complete property definitions with display options',
    'Resource and operation selectors',
    'Credential configurations',
    'Input/output specifications',
    'Version support',
    'Search aliases and metadata',
    'Dynamic subtitles',
    'Comprehensive examples'
  ]
};