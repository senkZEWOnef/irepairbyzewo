"use client";

export default function DebugEnv() {
  return (
    <div>
      <h1>Environment Variables Debug</h1>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT FOUND'}</p>
      <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'EXISTS' : 'NOT FOUND'}</p>
      <p>All env vars:</p>
      <pre>{JSON.stringify(process.env, null, 2)}</pre>
    </div>
  );
}