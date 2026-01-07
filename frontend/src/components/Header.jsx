import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ userName, onLogout }) => {
  return (
    <div className="bg-white shadow p-6 flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">Welcome back, {userName}</h1>
      <button 
        onClick={onLogout}
        className="flex items-center gap-2 text-xl hover:text-blue-600 transition-colors"
      >
        <LogOut /> Logout
      </button>
    </div>
  );
};

export default Header;
