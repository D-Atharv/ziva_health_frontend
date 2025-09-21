// "use client";

// import { useAuth } from "@/hooks/useAuth";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function HomePage() {
//   const { user, loading } = useAuth();
// const [mounted, setMounted] = useState(false);

// useEffect(() => setMounted(true), []);

// if (!mounted || loading)
//   return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-6">
//       <h1 className="text-3xl font-bold">
//         {user ? `Welcome ${user.name}` : "Welcome Guest"}
//       </h1>
//       <div className="flex gap-4">
//         {!user ? (
//           <>
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//             <Link href="/register">
//               <Button variant="secondary">Register</Button>
//             </Link>
//           </>
//         ) : (
//           <p className="text-green-500">You are logged in 🎉</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || loading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">
        {user ? `Welcome ${user.name}` : "Welcome Guest"}
      </h1>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </>
        ) : (
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
