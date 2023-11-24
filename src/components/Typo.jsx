import React from 'react';
import { useParams } from 'react-router-dom';
import { folders } from '../data/folder';
import TemplateList from './TemplatePage';

const Typo = () => {
    const { folderId } = useParams();
  
    // Find the folder based on folderId from URL params
    const selectedFolder = folders.find(folder => folder.id === parseInt(folderId));
  
    return (
      <div>
        <h2>Templates</h2>
        {selectedFolder && (
          <TemplateList templates={selectedFolder.templates} />
        )}
      </div>
    );
  };
  
  export default Typo;