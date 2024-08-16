import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport,Selection,Sort,Filter, PdfExport,Edit, Inject,Toolbar,Reorder,showGrandTotals } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid,customersData,supportGrid, CampainGrid } from '../data/dummy';
import { Header } from '../components';
import Backup2x from './Backup2x.jsx';
import { Html } from '../components';
import "../components/style.css";
import { GrapesMain } from "../components";
import axios from 'axios';

export default function Modal() { 
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    axios
      .get('https://server-beta-wheat-43.vercel.app/campaigns')
      .then((result) => {
        setGridData(result.data);
        console.log(result.data); // Add this line to log the fetched data
      })
      .catch((err) => console.log(err));
  }, []);

    const pageOptions = {
        pageSize: 8,
    };
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState('EmailEdit');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUrl, setselectedUrl] = useState(null);


  let gridcomp;
  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
    },
    'Search', 'Delete'
  ];
  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `Campaign_${currentDateTime}.xlsx`;
      const excelExportProperties = {
      fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  const handleTabClick = (tabName) => {
  setActiveTab(tabName);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setActiveTab('preview');
    setShowModal(true);
  };
  const handleUrlClick = (Url) => {
    setselectedUrl(Url);
    setShowModal(true);
  };
  
  return ( 
    <> 
    <div className="text-center text-3xl pt-10 pb-10 font-bold">
        <h1> Campaign insights </h1>
      </div>


      

<GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      dataSource={gridData}
      allowPaging
      allowSorting
      pageSettings={pageOptions}
      allowReordering={true} allowDrop={true}
      allowResizing
      editSettings={{allowDeleting:true, allowEditing:true, pageSizes: true}}
      width="auto"
      >
        
        <ColumnsDirective>
        {CampainGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        
        <Inject services = {[ Page, Toolbar,Reorder,Selection,Edit,Sort,Filter , ExcelExport]}/>
        
      </GridComponent>
 
  
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <GrapesMain /></div>
 
    </>
   

    
  );
}