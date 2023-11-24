// FolderPage.js
import React, { useState } from 'react';
import { folders } from '../data/folder';
import FolderList from '../components/FolderList';
import TemplateList from './TemplatePage';

const FolderPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderClick = folder => {
    setSelectedFolder(folder);
  };

  return (
    <div>
      <div>
      <h1 className="text-center pt-5  pb-5 text-xxl">All Templates</h1>
        <FolderList folders={folders} handleFolderClick={handleFolderClick} />
      </div>
      <div>
        {selectedFolder && (
          <TemplateList templates={selectedFolder.templates} />
        )}
      </div>
    </div>
  );
};

export default FolderPage;
