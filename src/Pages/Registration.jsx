import React from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, regGrid } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import "../components/style.css";


const Registration = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Registration" />

      <GridComponent 
      
      id ="gridcomp"
      dataSource={ordersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      toolbar={['Search']}
      >
        <ColumnsDirective>
        {regGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search  ]}/>
      </GridComponent>
    </div>
  )
}

export default Registration