/**
 * @fileoverview Utility script to generate bcrypt hashes for testing
 * @module scripts/generate-hash
 */

import bcrypt from 'bcrypt';

const passwords = {
  admin: 'admin123',
  user: 'user123'
};

async function generateHashes() {
  console.log('Generating password hashes...\n');

  for (const [role, password] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${role}:
  password: "${password}"
  hash: "${hash}"`);
  }
}

generateHashes(); 