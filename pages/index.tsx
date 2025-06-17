import { useState } from 'react';
import { MerkleTree } from '../src/MerkleTree';

export default function Home() {
  const [leaves, setLeaves] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [tree, setTree] = useState<MerkleTree | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [proof, setProof] = useState<{ path: string[]; index: number } | null>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const handleAddLeaf = () => {
    if (inputValue.trim()) {
      const newLeaves = [...leaves, inputValue.trim()];
      setLeaves(newLeaves);
      setInputValue('');
      setTree(new MerkleTree(newLeaves));
      setProof(null);
      setVerificationResult(null);
    }
  };

  const handleGenerateProof = (index: number) => {
    if (tree) {
      try {
        const newProof = tree.getProof(index);
        setProof(newProof);
        setSelectedIndex(index);
        setVerificationResult(null);
      } catch (error) {
        alert('Invalid index');
      }
    }
  };

  const handleVerify = () => {
    if (tree && proof && selectedIndex !== null) {
      const result = tree.verify(leaves[selectedIndex], proof);
      setVerificationResult(result);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Merkle Tree Demo</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter leaf value"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddLeaf}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Leaf
        </button>
      </div>

      {tree && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Merkle Root</h2>
          <p className="font-mono bg-gray-100 p-2 rounded">{tree.getRoot()}</p>
        </div>
      )}

      {leaves.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Leaves</h2>
          <div className="grid grid-cols-2 gap-2">
            {leaves.map((leaf, index) => (
              <div key={index} className="flex items-center">
                <span className="font-mono bg-gray-100 p-2 rounded flex-grow">{leaf}</span>
                <button
                  onClick={() => handleGenerateProof(index)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Generate Proof
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {proof && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Merkle Proof</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">Index: {proof.index}</p>
            <p className="mb-2">Path:</p>
            <div className="grid grid-cols-2 gap-2">
              {proof.path.map((hash, index) => (
                <p key={index} className="font-mono text-sm">{hash}</p>
              ))}
            </div>
            <button
              onClick={handleVerify}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
            >
              Verify Proof
            </button>
          </div>
        </div>
      )}

      {verificationResult !== null && (
        <div className={`p-4 rounded ${verificationResult ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className="font-bold">
            Verification Result: {verificationResult ? 'Valid' : 'Invalid'}
          </p>
        </div>
      )}
    </div>
  );
} 