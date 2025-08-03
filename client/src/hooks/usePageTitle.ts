import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Shticky - ${title}`;
    
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}