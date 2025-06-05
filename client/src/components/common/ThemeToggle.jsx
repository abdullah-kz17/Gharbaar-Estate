// components/common/ThemeToggle.jsx
import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 text-lg rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-800" />}
        </button>
    );
};

export default ThemeToggle;
