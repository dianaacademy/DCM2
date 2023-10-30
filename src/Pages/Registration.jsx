import React from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Toolbar  } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, regGrid2 } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import "../components/style.css";


const Registration = () => {
  let gridcomp;
    const toolbar = ['ExcelExport', 'Search'];
    const toolbarClick = (args) => {
        if (gridcomp && args.item.id === 'gridcomp_excelexport') {
            gridcomp.excelExport();
        }
    };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="RegistraTion" />

      <GridComponent id='gridcomp' dataSource={ordersData}  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      // dataSource={ordersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      // allowExcelExport={true}
      // toolbar={['ExcelExport']}
      >
        <ColumnsDirective>
        {regGrid2.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search,Toolbar  ]}/>
      </GridComponent>
    </div>
  )
}

export default Registration