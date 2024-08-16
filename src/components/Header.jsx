import React from 'react';

const Header = ({ category, title }) => {
  // Convert the title to uppercase
  const uppercasedTitle = title.toUpperCase();

  return (
    <div className="mb-10 mt-2">
      <p className="text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold   tracking-tight text-slate-900 ">
        {uppercasedTitle}
      </p>
    </div>
  );
};

export default Header;
