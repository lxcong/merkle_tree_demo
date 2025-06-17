import { createHash } from 'crypto';

export interface MerkleProof {
  path: string[];
  index: number;
}

export class MerkleTree {
  private leaves: string[];
  private tree: string[][];

  constructor(leaves: string[]) {
    this.leaves = leaves;
    this.tree = this.buildTree();
  }

  private hash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  private buildTree(): string[][] {
    if (this.leaves.length === 0) {
      return [['']];
    }

    // 确保叶子节点数量是 2 的幂
    const paddedLeaves = this.padLeaves(this.leaves);
    
    // 初始化树结构
    const tree: string[][] = [paddedLeaves.map(leaf => this.hash(leaf))];
    
    // 构建树的每一层
    while (tree[tree.length - 1].length > 1) {
      const currentLevel = tree[tree.length - 1];
      const nextLevel: string[] = [];
      
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1];
        const combined = left + right;
        nextLevel.push(this.hash(combined));
      }
      
      tree.push(nextLevel);
    }
    
    return tree;
  }

  private padLeaves(leaves: string[]): string[] {
    const paddedLeaves = [...leaves];
    const targetLength = Math.pow(2, Math.ceil(Math.log2(leaves.length)));
    
    while (paddedLeaves.length < targetLength) {
      paddedLeaves.push(paddedLeaves[paddedLeaves.length - 1]);
    }
    
    return paddedLeaves;
  }

  public getRoot(): string {
    return this.tree[this.tree.length - 1][0];
  }

  public getProof(index: number): MerkleProof {
    if (index < 0 || index >= this.leaves.length) {
      throw new Error('Invalid index');
    }

    const path: string[] = [];
    let currentIndex = index;

    for (let level = 0; level < this.tree.length - 1; level++) {
      const isRight = currentIndex % 2 === 1;
      const siblingIndex = isRight ? currentIndex - 1 : currentIndex + 1;
      
      if (siblingIndex < this.tree[level].length) {
        path.push(this.tree[level][siblingIndex]);
      }
      
      currentIndex = Math.floor(currentIndex / 2);
    }

    return {
      path,
      index
    };
  }

  public verify(leaf: string, proof: MerkleProof): boolean {
    let hash = this.hash(leaf);
    let currentIndex = proof.index;

    for (let i = 0; i < proof.path.length; i++) {
      const isRight = currentIndex % 2 === 1;
      const sibling = proof.path[i];
      
      if (isRight) {
        hash = this.hash(sibling + hash);
      } else {
        hash = this.hash(hash + sibling);
      }
      
      currentIndex = Math.floor(currentIndex / 2);
    }

    return hash === this.getRoot();
  }
} 