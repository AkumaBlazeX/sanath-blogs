import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const Favicon = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
      link.href = theme === 'dark' ? '/images/logo-white.png' : '/images/logo-black.png';
    }
  }, [theme]);

  return null;
};

export default Favicon; 