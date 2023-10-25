import React from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective, Page, Selection,Reorder, Inject, Edit, Toolbar, Sort, Filter,} from '@syncfusion/ej2-react-grids';
import {customersData, customersGrid , } from '../data/dummy';
import { Header } from '../components';
import { showGrandTotals } from '@syncfusion/ej2/pivotview';
import "../components/style.css";


const Tutor = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Instructor" />

      <GridComponent
      dataSource={customersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      toolbar={['Delete']}
      editSettings={{allowDeleting:true, allowEditing:true}}
      width="auto">
        <ColumnsDirective>
        {customersGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[ Page, Toolbar,Reorder,Selection,Edit,Sort,Filter]}/>
      </GridComponent>
    </div>
  )
}

export default Tutor