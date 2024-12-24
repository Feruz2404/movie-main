import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BsMoon, BsSun } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import { useDarkMode } from '../dark/DarkModeProvider';
import logo from '@/assets/images/logo.png';
import { FiSearch } from "react-icons/fi";

const lang = [
  {
    label: "Eng",
    value: "en",
  },
  {
    label: "Ru",
    value: "ru",
  },
  {
    label: "Uz",
    value: "uzb",
  },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode(); 

    const getActiveClass = (path) => {
        return location.pathname === path ? 'text-red-500 font-bold' : 'hover:text-red-500';
    };

    const handleLanguageChange = (e) => {
      const selectedLang = e.target.value;
    };

    return (
        <div className='container flex flex-wrap items-center justify-between py-6 bg-white dark:bg-black text-black dark:text-white'>
            <div onClick={() => navigate("/")} className='w-full sm:w-[22%] cursor-pointer'>
                <img className='w-[112px] h-[36px]' src={logo} alt="Logo" />
            </div>
            <div className='flex w-full sm:w-[30%] flex-wrap justify-between'>
                <Link to={"/"} className={`flex flex-wrap flex-col items-center ${getActiveClass("/")}`}>
                    <FaHome className='text-[24px]' />
                    <p className='text-[19px]'>Home</p>
                </Link>
                <Link to={"/movies"} className={`flex flex-wrap flex-col items-center ${getActiveClass("/movies")}`}>
                    <MdLocalMovies className='text-[24px]' />
                    <p className='text-[19px]'>Movies</p>
                </Link>
                <Link to={"/latest"} className={`flex flex-wrap flex-col items-center ${getActiveClass("/latest")}`}>
                    <BsBookmarkFill className='text-[24px]' />
                    <p className='text-[19px]'>Saved</p>
                </Link>
                <Link to={"/search"} className={`flex flex-wrap flex-col items-center ${getActiveClass("/search")}`}>
                    <FiSearch className='text-[24px]' />
                    <p className='text-[19px]'>Search</p>
                </Link>
            </div>
            <div className='flex flex-wrap items-center justify-between w-full sm:w-[21%]'>
                <button
                    onClick={toggleDarkMode}
                    className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? <BsSun className='text-[20px]' /> : <BsMoon className='text-[20px]' />}
                </button>

                <select
                    className='h-full bg-slate-900 px-3 py-2 rounded-md text-white'
                    onChange={handleLanguageChange}
                    aria-label="Select Language"
                >
                    {lang.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <button
                    className='w-[130px] bg-red-700 text-white py-3 rounded-xl'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
