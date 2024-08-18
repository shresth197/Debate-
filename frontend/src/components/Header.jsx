import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from '../assests/avatar.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUser, setIsUser] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const getUser = () => {
        try {
            const user = localStorage.getItem('token');
            if (!user) {
                return;
            }
            setIsUser(user);
            
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsUser(null);
        navigate('/');
    };

    return (
        <div className="flex justify-between items-center px-1 fixed w-full z-30 top-0">
            <h1 className="text-center flex-grow">Debate Topics</h1>
            <div className="flex items-center space-x-4 bg-[#ffa500] py-[2px] px-4 h-auto">
                {!isUser ? (
                    <div className="py-[7px] flex gap-3">
                        <Link to='/signup' className="border rounded px-3 text-white hover:border-black hover:bg-[#ffa500] cursor-pointer">Sign up</Link>
                        <Link to='/login' className="border rounded px-3 text-white hover:border-black hover:bg-[#ffa500] cursor-pointer">Log in</Link>
                    </div>
                ) : (
                    <>
                        <img
                            src={avatar}
                            alt="profileimage"
                            className="w-10 h-10 cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-4 mt-2 w-48 bg-white top-9 border border-gray-300 rounded-md shadow-lg z-10 py-2"
                            >
                                <ul className="py-1">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-[#ffa500] hover:text-white cursor-pointer">
                                            My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-[#ffa500] hover:text-white cursor-pointer">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/changepassword" className="block px-4 py-2 text-gray-700 hover:bg-[#ffa500] hover:text-white cursor-pointer">
                                            Change Password
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/account-settings" className="block px-4 py-2 text-gray-700 hover:bg-[#ffa500] hover:text-white cursor-pointer">
                                            Account Settings
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button
                            className="border rounded px-2 py-1 hover:bg-orange-400 hover:border-black hover:text-white cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
