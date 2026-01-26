// Load environment variables explicitly
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

// Import createClient from @supabase/supabase-js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Debug output
console.log('🔧 Loading Supabase configuration...');
console.log(`   URL present: ${supabaseUrl ? '✅' : '❌'}`);
console.log(`   Key present: ${supabaseAnonKey ? '✅' : '❌'}`);
console.log(`   Full URL: ${supabaseUrl ? supabaseUrl : 'Not set'}`);
console.log(`   Key preview: ${supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'Not set'}`);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ ERROR: Missing Supabase environment variables!');
  console.error('   Make sure you have a .env file in the project root with:');
  console.error('   SUPABASE_URL=https://your-project.supabase.co');
  console.error('   SUPABASE_ANON_KEY=your-anon-key-here\n');
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

console.log('✅ Supabase client initialized successfully\n');
module.exports = supabase;