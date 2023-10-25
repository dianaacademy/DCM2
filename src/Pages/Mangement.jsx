import React from 'react';
import { GridComponent, Search, ColumnsDirective,ColumnDirective, Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, manageGrid } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import { refreshCell } from '@syncfusion/ej2/spreadsheet';
import "../components/style.css";


const Mangement = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Document Management" />

      <GridComponent
      
      id ="gridcomp"
      dataSource={ordersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      toolbar={['Search']}
      >
        <ColumnsDirective >
        {manageGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[Search, Resize,Sort,ContextMenu,Reorder, Filter, Page, ExcelExport, Edit,PdfExport , ]}/>
      </GridComponent>
    </div>
  )
}

export default Mangement