'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessMessage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to home page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">You are now signed in</h1>
        <p>Redirecting to home page...</p>
      </main>
    </div>
  );
}