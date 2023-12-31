import React, { useState } from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Page, ExcelExport,Selection,Sort,Filter, PdfExport,Edit, Inject,Toolbar,showGrandTotals } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid,customersData,supportGrid } from '../data/dummy';
import { Header } from '../components';

function Ecommerce() {
  const [activeTab, setActiveTab] = useState('tycon');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col pl-10 pt-10 ">
      <div className="flex">
        <button
          className={`w-1/4 text-center font-serif  font-bold uppercase px-5 py-5 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'tycon' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('tycon')}
        >
          <div className="flex flex-col  text-left"> {/* Add a flex container */}
            <span>Fresh leads</span>
           <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
            activeTab === 'tycom' ? 'bg-white p-2' : ''
               }`}>63
          </span>
         </div>
        </button>
        <button
       className={`w-1/4 text-left  font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 relative ${
        activeTab === 'tycom' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
         }`}
       onClick={() => handleTabClick('tycom')}
     >
     <div className="flex flex-col  text-left"> {/* Add a flex container */}
    <span>Follow up Today</span>
    <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
      activeTab === 'tycom' ? 'bg-white p-2' : ''
    }`}>63
    </span>
  </div>
</button>


        <button
          className={`w-1/4 text-center font-serif  font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'styam' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('styam')}
        ><div className="flex flex-col  text-left"> {/* Add a flex container */}
        <span>Instrested</span>
        <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
          activeTab === 'tycom' ? 'bg-white p-2' : ''
        }`}>40
        </span>
      </div>
        </button>
        <button
          className={`w-1/4 text-center font-serif font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal mr-5 ${
            activeTab === 'nine' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => handleTabClick('nine')}
        ><div className="flex flex-col  text-left"> {/* Add a flex container */}
        <span>Follow up Overdues</span>
        <span className={`mt-2 px-2 py-1 rounded-lg items-center text-left${
          activeTab === 'nine' ? 'bg-white p-2' : ''
        }`}>63
        </span>
      </div>
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'tycon' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="Fresh leads" />

            <GridComponent
              dataSource={employeesData}
              allowPaging
              allowSorting
              toolbar={['Search']}
              width="auto"
            >
              <ColumnsDirective>
                {clientGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        )}
        {activeTab === 'nine' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="Follow up Overdues" />

            <GridComponent
              dataSource={employeesData}
              allowPaging
              allowSorting
              toolbar={['Search']}
              width="auto"
            >
              <ColumnsDirective>
                {clientGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
        )}
        {/* Render other tab content similarly */}
        {activeTab === 'tycom' && (
          <div>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            {/* Insert your content for the Tycon tab here */}
            <Header category="Page" title="Follow up Today" />

            <GridComponent
              dataSource={employeesData}
              allowPaging
              allowSorting
              toolbar={['Search']}
              width="auto"
            >
              <ColumnsDirective>
                {clientGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Search,
                  Toolbar,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
          </div>
        )}
        {activeTab === 'styam' && (
          <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header category= "Page" title="Instrested" />
    
          <GridComponent
          dataSource={customersData}
          allowPaging
          allowSorting
          toolbar={['Delete', ]}
          editSettings={{allowDeleting:true, allowEditing:true}}
          width="auto">
            <ColumnsDirective>
            {supportGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
            ))}
            </ColumnsDirective>
            <Inject services = {[ Search,Page, Toolbar,Selection,Edit,Sort,Filter,]}/>
          </GridComponent>
        </div>
        )}
      </div>
    </div>
  );
}
export default Ecommerce;