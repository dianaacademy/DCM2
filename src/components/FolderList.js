import React from 'react';
import { Link } from 'react-router-dom';

const FolderList = ({ folders }) => (
  <div className="flex flex-wrap justify-center"> {/* Parent container for folders */}
    {folders.map(folder => (
      <div key={folder.id} className="w-1/3 p-5">
        <Link to={`/templates`}>
          <div className="bg-indigo-500 text-white font-bold uppercase text-sm shadow hover:shadow-lg cursor-pointer rounded-md">
            <img
              className="rounded-md"
              src="https://ik.imagekit.io/kkb/px-conversions%20(28)/weeee?updatedAt=1697019040527"
              alt="Data Privacy"
            />
            <p className="text-center pt-5 pb-5">{folder.name}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default FolderList;