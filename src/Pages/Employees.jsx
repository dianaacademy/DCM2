import React from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport, PdfExport,Edit, Inject,Toolbar } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import "../components/style.css";


const Employees = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Employees" />

      <GridComponent
      dataSource={employeesData}
      allowPaging
      allowSorting
      toolbar={['Search']}
      width="auto">
        <ColumnsDirective>
        {employeesGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services = {[ Page, Search,Toolbar, ExcelExport, Edit,PdfExport  ]}/>
      </GridComponent>
    </div>
  )
}

export default Employees