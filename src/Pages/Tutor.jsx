import React from 'react';
import {GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Toolbar} from '@syncfusion/ej2-react-grids';
import {customersData, customersGrid , } from '../data/dummy';
import { Header } from '../components';
import { showGrandTotals } from '@syncfusion/ej2/pivotview';
import "../components/style.css";


const Tutor = () => {
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
      const fileName = `Tutor_${currentDateTime}.xlsx`;
      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Instructor" />

      <GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      dataSource={customersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto">
        <ColumnsDirective>
        {customersGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[ Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search,Toolbar ]}/>
      </GridComponent>
    </div>
  )
}

export default Tutor