// components/ClientOnlyProvider.tsx
import { PropsWithChildren, useEffect, useState } from "react";

export default function ClientOnlyProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
