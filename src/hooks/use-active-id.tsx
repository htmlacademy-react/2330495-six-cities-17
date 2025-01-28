import { useState, useCallback } from 'react';

export function useActiveId() {
  const [isActiveId, setIsActiveId] = useState<string | null>(null);

  const handleActiveIdChange = useCallback((id: string | null) => {
    setIsActiveId(id);
  }, []);

  return { isActiveId, handleActiveIdChange };
}
