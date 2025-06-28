import { describe, test, expect, beforeEach } from '@jest/globals';
import { NodeDiscoveryService } from '../../../src/helpers/node-discovery';
import { NodeTypeInfo } from '../../../src/data/node-types';

describe('Node Discovery Service', () => {
  let nodeDiscovery: NodeDiscoveryService;

  beforeEach(() => {
    nodeDiscovery = new NodeDiscoveryService();
  });

  test('should initialize node discovery service', () => {
    expect(nodeDiscovery).toBeDefined();
    expect(typeof nodeDiscovery.searchNodes).toBe('function');
    expect(typeof nodeDiscovery.getNodesByCategory).toBe('function');
    expect(typeof nodeDiscovery.getNodeByName).toBe('function');
  });

  test('should validate node configuration', () => {
    const validNode = {
      name: 'test-node',
      displayName: 'Test Node',
      description: 'A test node'
    };

    const result = nodeDiscovery.validateNode(validNode);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(Array.isArray(result.warnings)).toBe(true);
    expect(Array.isArray(result.suggestions)).toBe(true);
  });

  test('should return errors for invalid node configuration', () => {
    const invalidNode = {};

    const result = nodeDiscovery.validateNode(invalidNode);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Node name is required');
  });

  test('should generate workflow skeleton', () => {
    const nodeTypes = ['webhook', 'set', 'httpRequest'];

    const result = nodeDiscovery.generateWorkflowSkeleton(nodeTypes);

    expect(result.version).toBe(1);
    expect(result.nodes).toHaveLength(3);
    expect(result.nodes[0].type).toBe('webhook');
    expect(result.nodes[1].type).toBe('set');
    expect(result.nodes[2].type).toBe('httpRequest');
    expect(result.connections).toBeDefined();
  });

  test('should validate workflow configuration', () => {
    const validWorkflow = {
      nodes: [
        { id: '1', name: 'webhook', type: 'webhook' }
      ],
      connections: {}
    };

    const result = nodeDiscovery.validateWorkflow(validWorkflow);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(Array.isArray(result.warnings)).toBe(true);
  });

  test('should return errors for invalid workflow', () => {
    const invalidWorkflow = {};

    const result = nodeDiscovery.validateWorkflow(invalidWorkflow);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow must have nodes');
  });

  test('should get statistics', () => {
    const stats = nodeDiscovery.getStatistics();

    expect(stats).toHaveProperty('totalNodes');
    expect(stats).toHaveProperty('loadedNodes');
    expect(stats).toHaveProperty('categories');
    expect(stats).toHaveProperty('cacheHits');
    expect(stats).toHaveProperty('cacheMisses');
    expect(stats).toHaveProperty('cacheEfficiency');
    expect(typeof stats.totalNodes).toBe('number');
    expect(typeof stats.loadedNodes).toBe('number');
    expect(typeof stats.categories).toBe('number');
  });

  test('should get categories', () => {
    const categories = nodeDiscovery.getCategories();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Core Nodes');
  });

  test('should clear cache', () => {
    expect(() => nodeDiscovery.clearCache()).not.toThrow();
  });

  test('should preload popular nodes', async () => {
    await expect(nodeDiscovery.preloadPopularNodes()).resolves.not.toThrow();
  });

  test('should validate node with missing display name', () => {
    const nodeWithoutDisplayName = {
      name: 'test-node',
      description: 'A test node'
    };

    const result = nodeDiscovery.validateNode(nodeWithoutDisplayName);

    expect(result.valid).toBe(true);
    expect(result.warnings).toContain('Display name is recommended');
  });

  test('should validate node with missing description', () => {
    const nodeWithoutDescription = {
      name: 'test-node',
      displayName: 'Test Node'
    };

    const result = nodeDiscovery.validateNode(nodeWithoutDescription);

    expect(result.valid).toBe(true);
    expect(result.warnings).toContain('Description is recommended');
  });

  test('should handle null node configuration', () => {
    const result = nodeDiscovery.validateNode(null);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Node configuration must be an object');
  });

  test('should handle workflow with empty nodes array', () => {
    const workflowWithEmptyNodes = {
      nodes: [],
      connections: {}
    };

    const result = nodeDiscovery.validateWorkflow(workflowWithEmptyNodes);

    expect(result.valid).toBe(true);
    expect(result.warnings).toContain('Workflow has no nodes');
  });

  test('should handle workflow with invalid nodes property', () => {
    const workflowWithInvalidNodes = {
      nodes: 'not an array',
      connections: {}
    };

    const result = nodeDiscovery.validateWorkflow(workflowWithInvalidNodes);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Workflow nodes must be an array');
  });
});
