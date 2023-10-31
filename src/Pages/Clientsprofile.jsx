import React from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective,Search , Reorder,Resize,Page,Sort,Filter,ContextMenu, ExcelExport, PdfExport,Edit, Inject,Toolbar } from '@syncfusion/ej2-react-grids';
import { employeesData,contextMenuItems, clientGrid } from '../data/dummy';
import { Header } from '../components';
import "../components/style.css";


const Clientsprofile = () => {
  const [showModal, setShowModal] = React.useState(false);
  let gridcomp;
  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
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
      const fileName = `ClientList_${currentDateTime}.xlsx`;
      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="Clients-profile" />

      <button
        className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1   mb-5 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        + Add Record
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start ">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Client Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Designation" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Country" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>
                <div class="relative flex  flex-wrap items-stretch mb-3 w-80">
                   <input type="text" placeholder="Company Name" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                   <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  </span>
                </div>     
              <div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Delegate</label>
               <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Company</option>
               <option value="US">Students</option>
              </select>
                </div>
              
              <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-5"
                    type="Submit"
                    onClick={() => setShowModal(false)}
                  >
                  Submit
              </button>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

<GridComponent id='gridcomp'  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      dataSource={employeesData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      allowResizing
      editSettings={{ allowEditing:true}}
      width="auto">
        <ColumnsDirective>
        {clientGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}  />
        ))}
        </ColumnsDirective>
        <Inject services = {[ Resize,Reorder,Page, Search,Toolbar, ExcelExport,Sort,Filter,ContextMenu, Edit,PdfExport  ]}/>
      </GridComponent>
    </div>
  )
}

export default Clientsprofile











