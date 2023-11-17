import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject, } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { contextMenuItems, regGrid } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import { Header } from '../components';
import "../components/style.css";


const Lmsdcm = () => {
  const [gridData, setGridData] = useState([]);
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
 

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
    'Search','Edit', 'Delete', 'Update', 'Cancel '
  ];

  useEffect(() => {
    axios
      .get('http://localhost:3001/login')
      .then((result) => setGridData(result.data))
      .catch((err) => console.log(err));
  }, []);


  const actionCompleteHandler = (args) => {
    if (args.requestType === 'save') {
      const updatedData = args.data;
      const loginsId = updatedData._id;
      updateCourse(loginsId, updatedData);
    }
  };

  const updateCourse = async (_id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/login/update/${_id}`, updatedData);
      if (response.status === 200) {
        // Update gridData state after successfully updating a record
        setGridData((prevGridData) => {
          return prevGridData.map((logins) => {
            if (logins._id === _id) {
              return updatedData;
            }
            return logins;
          });
        });
      } else {
        console.error('Error updating record:', response);
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleGridActionBegin = (args) => {
    if (args.requestType === 'delete') {
      // Get the selected record's ID
      const record = args.data[0];
      const recordId = record._id; // Assuming "_id" is the unique identifier

      // Send a delete request to the server
      axios
        .delete(`http://localhost:3001/login/delete/${recordId}`)
        .then((response) => {
          if (response.status === 200) {
            // Data was successfully deleted, you can update your local state if needed
            // Update gridData state
            const updatedGridData = gridData.filter((data) => data._id !== recordId);
            setGridData(updatedGridData);
          } else {
            console.error('Error deleting record:', response);
          }
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
        });
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `LMS_${currentDateTime}.xlsx`;

      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };

  //dropdown edit start
 let StatusElem;
 let statusObj;
 const statusParams = {
       create: () => {
        StatusElem = document.createElement('input');
           return StatusElem;
       },
       destroy: () => {
        statusObj.destroy();
       },
       read: () => {
           return statusObj.text;
       },
       write: () => {
        statusObj = new DropDownList({
               change: () => {
                  const tempQuery = new Query().where('countryId', 'equal', statusObj.value); },
               dataSource: new DataManager(status),
               fields: { value: 'statusId', text: 'statusName' },
               floatLabelType: 'Never',
               placeholder: 'Status'
           });
           statusObj.appendTo(StatusElem);
       }
   };
 
   const status = [
     { statusName: 'Completed', statusId: '1' },
     { statusName: 'Pending', statusId: '2' }
 ];
 
  //dropdown edit End

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="LMS Login" />

      <GridComponent 
      
      id="gridcomp"
        dataSource={gridData}
        toolbar={toolbar}
        allowExcelExport={true}
        toolbarClick={toolbarClick}
        ref={(g) => (gridcomp = g)}
        allowPaging
        allowSorting
        allowReordering={true}
        allowDrop={true}
        editSettings={editOptions}
        allowResizing
        actionComplete={actionCompleteHandler}
        actionBegin={handleGridActionBegin}
      >
        <ColumnsDirective>
        
        {regGrid.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        <ColumnDirective  field='Status' headerText='Status' editType='dropdownedit' edit={statusParams} textAlign="Center"/>
        </ColumnsDirective>
        <Inject services = {[Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search ,ExcelExport ]}/>
      </GridComponent>
    </div>
  )
}

export default Lmsdcm