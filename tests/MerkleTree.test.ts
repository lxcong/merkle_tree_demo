import { MerkleTree } from '../src/MerkleTree';

describe('MerkleTree', () => {
  it('should create a valid merkle tree with even number of leaves', () => {
    const leaves = ['a', 'b', 'c', 'd'];
    const tree = new MerkleTree(leaves);
    expect(tree.getRoot()).toBeDefined();
  });

  it('should create a valid merkle tree with odd number of leaves', () => {
    const leaves = ['a', 'b', 'c'];
    const tree = new MerkleTree(leaves);
    expect(tree.getRoot()).toBeDefined();
  });

  it('should generate valid proof for a leaf', () => {
    const leaves = ['a', 'b', 'c', 'd'];
    const tree = new MerkleTree(leaves);
    const proof = tree.getProof(0);
    
    expect(proof.path).toBeDefined();
    expect(proof.index).toBe(0);
    expect(proof.path.length).toBeGreaterThan(0);
  });

  it('should verify a valid proof', () => {
    const leaves = ['a', 'b', 'c', 'd'];
    const tree = new MerkleTree(leaves);
    const proof = tree.getProof(0);
    
    expect(tree.verify(leaves[0], proof)).toBe(true);
  });

  it('should reject an invalid proof', () => {
    const leaves = ['a', 'b', 'c', 'd'];
    const tree = new MerkleTree(leaves);
    const proof = tree.getProof(0);
    
    expect(tree.verify('invalid', proof)).toBe(false);
  });

  it('should throw error for invalid index', () => {
    const leaves = ['a', 'b', 'c', 'd'];
    const tree = new MerkleTree(leaves);
    
    expect(() => tree.getProof(10)).toThrow('Invalid index');
  });

  it('should handle empty leaves array', () => {
    const tree = new MerkleTree([]);
    expect(tree.getRoot()).toBeDefined();
  });
}); 