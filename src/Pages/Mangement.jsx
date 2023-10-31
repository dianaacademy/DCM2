import React from 'react';
import { GridComponent, Search, ColumnsDirective,ColumnDirective, Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, manageGrid } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import { refreshCell } from '@syncfusion/ej2/spreadsheet';
import "../components/style.css";


const Mangement = () => {
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
      const fileName = `Documents_${currentDateTime}.xlsx`;

      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Document Management" />
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
          {manageGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Search,
            Resize,
            Sort,
            ContextMenu,
            Reorder,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
}

export default Mangement;
