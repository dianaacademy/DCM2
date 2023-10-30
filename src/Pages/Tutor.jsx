import React from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective, Page, Selection,Reorder, Inject, Edit, Toolbar, Sort, Filter,ExcelExport} from '@syncfusion/ej2-react-grids';
import {customersData, customersGrid , } from '../data/dummy';
import { Header } from '../components';
import { showGrandTotals } from '@syncfusion/ej2/pivotview';
import "../components/style.css";


const Tutor = () => {
  let gridcomp;
    const toolbar = ['ExcelExport', 'Search','Delete'];
    const toolbarClick = (args) => {
        if (gridcomp && args.item.id === 'gridcomp_excelexport') {
            gridcomp.excelExport();
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
        <Inject services = {[ ExcelExport,Page, Toolbar,Reorder,Selection,Edit,Sort,Filter]}/>
      </GridComponent>
    </div>
  )
}

export default Tutor