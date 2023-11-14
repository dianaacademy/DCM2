import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective,ColumnDirective, Search,Resize,Reorder, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Edit, Inject,Toolbar,} from '@syncfusion/ej2-react-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { contextMenuItems, regGrid2 } from '../data/dummy';
import { ordersData } from '../data/ordersData';
import axios from 'axios';
import { Header } from '../components';
import "../components/style.css";
import Papa from 'papaparse';
import { cascadeData } from '../data/ordersData'


const Registration = () => {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/enrollusers')
      .then((result) => {
        setGridData(result.data);
        console.log(result.data); // Add this line to log the fetched data
      })
      .catch((err) => console.log(err));
  }, []);
  let gridcomp;
  const toolbar = [
    {
      text: 'Export CSV',
      tooltipText: 'Export to Excel',
      prefixIcon: 'e-btn-icon e-excelexport e-icons e-icon-left',
      id: 'gridcomp_excelexport',
    },
    'Search', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'
  ];
   //upload excel code start
  const [tableData, setTableData] = useState(ordersData); 
  const [selectedFile, setSelectedFile] = useState(null);// if we remove this excel code 1st we need to remove tableData from grid component and place "ordersData"

  //dropdown edit start
let countryElem;
let countryObj;
const countryParams = {
      create: () => {
          countryElem = document.createElement('input');
          return countryElem;
      },
      destroy: () => {
          countryObj.destroy();
      },
      read: () => {
          return countryObj.text;
      },
      write: () => {
          countryObj = new DropDownList({
              change: () => {
                 const tempQuery = new Query().where('countryId', 'equal', countryObj.value); },
              dataSource: new DataManager(country),
              fields: { value: 'countryId', text: 'countryName' },
              floatLabelType: 'Never',
              placeholder: 'Select a country'
          });
          countryObj.appendTo(countryElem);
      }
  };

  const country = [
    { countryName: 'United States', countryId: '1' },
    { countryName: 'Australia', countryId: '2' }
];

 //dropdown edit End
const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        parseCSVData(csvData);
      };
      reader.readAsText(selectedFile);
    }
  };
  const parseCSVData = (csvData) => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Merge the uploaded data with the existing data
        setTableData([...tableData, ...results.data]);
      },
    });
  };
  //upload excel code end
  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace(/:/g, '-');
    return formattedDate;
  };

  const toolbarClick = (args) => {
    if (gridcomp && args.item.id === 'gridcomp_excelexport') {
      const currentDateTime = getCurrentDateTime();
      const fileName = `Registration_${currentDateTime}.xlsx`;
      const excelExportProperties = {
        fileName: fileName,
      };

      gridcomp.excelExport(excelExportProperties);
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category= "Page" title="RegistraTion" />
      <h1 className=" mt-10 text-xl font-bold mb-5">Add More Data</h1>
        <input className="mb-5" type="file" accept=".csv" onChange={handleFileSelect} />
        {selectedFile && (
          <button
            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-5"
            onClick={handleFileUpload}
          >
            Upload CSV
          </button>
        )}

      <GridComponent id='gridcomp' dataSource={gridData}  toolbar={toolbar} allowExcelExport={true} toolbarClick={toolbarClick} ref={g => gridcomp = g}
      // dataSource={ordersData}
      allowPaging
      allowSorting
      allowReordering={true} allowDrop={true}
      editSettings={{allowDeleting:true, allowEditing:true}}
      allowResizing
      // allowExcelExport={true}
      // toolbar={['ExcelExport']}
      >
        <ColumnsDirective >
        {regGrid2.map((item,index) => (<ColumnDirective key= {index}  {...item}/>
        ))}
        <ColumnDirective  field='Status' headerText='Status' width='150' editType='dropdownedit' edit={countryParams} textAlign="Center"/>
        </ColumnsDirective>
        <Inject services = {[Reorder,Resize,Sort,ContextMenu, Filter,Page, ExcelExport, Edit,PdfExport,Search,Toolbar]}/>
      </GridComponent>
    </div>
  )
}

export default Registration