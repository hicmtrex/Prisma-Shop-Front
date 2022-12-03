import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState<string>('');

  useEffect(() => {
    const time = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);

  return [debounce];
};

export default useDebounce;
