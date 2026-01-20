// test-env.js
require('dotenv').config();

console.log('Checking environment variables...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Present' : '✗ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓ Present' : '✗ Missing');
console.log('Current directory:', __dirname);

// Run this with: node test-env.js