import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification } from '.';
import { Button } from './ui/button';

import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotcolor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotcolor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick } = useStateContext();
  const [activeProgram, setActiveProgram] = useState('DCLP');
  const programs = ['DCLP', 'DCBT', 'DJP', 'DTA', 'TEKFINIX', 'DSAE'];
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const program = searchParams.get('program');
    if (program && programs.includes(program.toUpperCase())) {
      setActiveProgram(program.toUpperCase());
    }
  }, [location]);

  const handleClickcc = (program) => {
    setActiveProgram(program);
    navigate(`?program=${program.toLowerCase()}`, { replace: true });
  };

  return (
    <div className="flex p-2 md:mx-6 relative justify-between">
      <div className="flex items-center">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color="blue"
          icon={<AiOutlineMenu />}
        />
        <div className="flex ml-4">
          {programs.map((program) => (
            <Button
            variant={activeProgram === program ? '' : 'outline'}
            key={program}
            onClick={() => handleClickcc(program)}
            className={`${activeProgram === program ? 'active' : ''} ml-2 mr-2`}
          >
            {program}
          </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center mr-12 ">
        <TooltipComponent content="Profile" position="BottomCenter">
          
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('UserProfile')}
          >
            <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">Admin</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
