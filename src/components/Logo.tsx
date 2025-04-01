import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link 
      to="/" 
      className="group flex items-center space-x-3 transition-all duration-300 hover:opacity-90"
    >
      <div className="relative h-10 w-10 overflow-hidden">
        <img
          src="/images/logo-black.png"
          alt="Sanath Blogs Logo"
          className={`absolute h-full w-full object-contain transform transition-all duration-300 ${
            theme === 'dark' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        />
        <img
          src="/images/logo-white.png"
          alt="Sanath Blogs Logo"
          className={`absolute h-full w-full object-contain transform transition-all duration-300 ${
            theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        />
      </div>
      <span className="font-bold text-2xl text-gray-900 dark:text-white transition-colors duration-300">
        Sanath Blogs
      </span>
    </Link>
  );
};

export default Logo; 