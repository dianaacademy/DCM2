import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const truncateEmail = (email) => {
    if (!email) return 'Guest';
    return email.length <= 7 ? email : `${email.slice(0, 7)}...`;
  };

  return (
    <TooltipComponent
      content={
        <div className="p-2">
          <p className="mb-2">{user?.email || 'Guest'}</p>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </div>
      }
      position="BottomCenter"
    >
      <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
        <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile" />
        <p>
          <span className="text-gray-400 text-14">Hi, </span>{' '}
          <span className="text-gray-400 font-bold ml-1 text-14">
            <span className="relative">
              {truncateEmail(user?.email)}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50" />
            </span>
          </span>
        </p>
        <MdKeyboardArrowDown className="text-gray-400 text-14" />
      </div>
    </TooltipComponent>
  );
};

export default UserProfileMenu;