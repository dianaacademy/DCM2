import React from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject, } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, regGrid } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import "../components/style.css";


const Lmsdcm = () => {
  let gridcomp;

  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
      style: {
        background: 'blue',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'inline-block',
      },
    },
    'Search',
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `LMS_${currentDateTime}.xlsx`;

      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="LMS Login" />

      <GridComponent 
      
      id="gridcomp"
        dataSource={ordersData}
        toolbar={toolbar}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
        ref={(g) => (gridcomp = g)}
        allowPaging
        allowSorting
        allowReordering={true}
        allowDrop={true}
        allowResizing
      >
        <ColumnsDirective>
        {regGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search ,ExcelExport ]}/>
      </GridComponent>
    </div>
  )
}

export default Lmsdcm