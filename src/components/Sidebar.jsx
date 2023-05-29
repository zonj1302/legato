import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { links } from '../assets/constants';

function NavLinks({ handleClick }) {
    return (
        <div className="mt-20">
            { links.map(link => (
                <NavLink 
                    key={ link.name }
                    to={ link.to }
                    className="flex flex-row justify-start items-center text-gray-500 my-5 font-medium hover:text-cyan-400 text-sm"
                    onClick={ () => handleClick && handleClick()}
                >
                    <link.icon className="w-6 h-6 mr-2"/>
                    { link.name }
                </NavLink>
            ))}
        </div>
    )
}

function Sidebar() {
    const [ burgerMenu, setBurgerMenu ] = useState(false);

    return (
        <>
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gradient-to-br from-black to-[#123456]">
                <h1 className="font-bold text-white text-3xl flex justify-center">LEGATO</h1>
                <NavLinks />
            </div>
            <div className="absolute md:hidden block top-6 right-3">
                {burgerMenu ? (
                    <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={ () => setBurgerMenu(false) }/>
                ) : (
                    <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={ () => setBurgerMenu(true) } />
                )}
            </div>
            <div className={`top-0 h-screen w-1/3 bg-gradient-to-tl from-white/10 to-[#123456] backdrop-blur-lg z-10 p-6 md-hidden smooth-transition absolute ${ burgerMenu ? 'left-0' : '-left-full' }`}>
                    <h1 className="font-bold text-white text-3xl flex justify-center">LEGATO</h1>
                    <NavLinks handleClick={ () => setBurgerMenu(false) }/>
            </div>
        </>
    )
}

export default Sidebar;