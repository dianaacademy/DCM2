import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GridComponent, ColumnsDirective, ColumnDirective, Search, Page, ExcelExport, Edit, Inject, Toolbar,Freeze } from '@syncfusion/ej2-react-grids';
import { Button } from '../../src/components/ui/button';
import { Badge } from '../../src/components/ui/badge';

import { useLocation, useNavigate } from 'react-router-dom';

import AddNewLeadsDialog from './AddNewLeadsDialog';
import { Sheetforleads } from '../components/Sheetforleads';

function Leadgenerate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  
  const location = useLocation();
  const navigate = useNavigate();
  let gridcomp;
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get('program') || '';
  const followupStatus = searchParams.get('followupstatus') || '';

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('http://localhost:3001/leads');
      setGridData(result.data);
      filterData(result.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const statusTextMap = {
    freshleads: 'Fresh Leads',
    followuptoday: 'Follow up Today',
    instrested: 'Interested',
    followupoverdues: 'Follow up Overdues',
  };

  const programText = program ? program.charAt(0).toUpperCase() + program.slice(1) : '';
  const followupStatusText = followupStatus ? statusTextMap[followupStatus] || followupStatus.charAt(0).toUpperCase() + followupStatus.slice(1) : '';

  const filterData = (data) => {
    let filtered = data;
    if (program) {
      filtered = filtered.filter(item => item.program.toUpperCase() === program.toUpperCase());
    }
    if (followupStatus) {
      filtered = filtered.filter(item => item.followupstatus === followupStatus);
    }
    setFilteredData(filtered);
  };

  const handleStatusButtonClick = (status) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('followupstatus', status);
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        await axios.post('http://localhost:3001/leads/upload', formData);
        fetchData();
      } catch (error) {
        console.error('Error uploading CSV file:', error);
      }
    }
  };

  const toolbarClick = (args) => {
    if (args.item.id === 'gridcomp_excelexport') {
      const excelExportProperties = {
        fileName: `Leads-List_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`,
      };
      args.cancel = true;
      gridcomp.excelExport(excelExportProperties);
    }
  };

  const actionCompleteHandler = async (args) => {
    if (args.requestType === 'save') {
      try {
        await axios.put(`http://localhost:3001/leads/update/${args.data._id}`, args.data);
        fetchData();
      } catch (error) {
        console.error('Error updating record:', error);
      }
    }
  };

  const handleGridActionBegin = async (args) => {
    if (args.requestType === 'delete') {
      try {
        await axios.delete(`http://localhost:3001/leads/delete/${args.data[0]._id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const rowNumberTemplate = (props) => props.index + 1;

  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const toolbar = ['ExcelExport', 'Search', 'Add', 'Edit', 'Delete', 'Update', 'Cancel'];




  return (
    <div className="bg-gray-100 min-h-screen p-6 overflow-hidden">
      <div className="flex space-x-4 mb-6 transition-all duration-300 ease-in-out">
        {['freshleads', 'followuptoday', 'instrested', 'followupoverdues'].map((status) => {
          const displayText = statusTextMap[status] || status.charAt(0).toUpperCase() + status.slice(1);

          return (
            <Button
              variant={followupStatus === status ? '' : 'outline'}
              key={status}
              onClick={() => handleStatusButtonClick(status)}
              className={`${followupStatus === status ? 'active' : ''}`}
            >
              {displayText}
            </Button>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <Badge className="mb-6">{programText} &gt; {followupStatusText}</Badge>

        

        <div className="mb-6 space-y-4">
        <AddNewLeadsDialog/>

          <div>
            <h2 className="text-xl font-bold mb-2">Add More Data</h2>
            <input type="file" accept=".csv" onChange={handleFileSelect} className="mb-2" />
            {selectedFile && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                onClick={handleFileUpload}
              >
                Upload CSV
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        ) : (
          <GridComponent
            id="gridcomp"
            
            dataSource={filteredData}
            toolbar={toolbar}
            allowExcelExport={true}
            frozenColumns={2}
            
            toolbarClick={toolbarClick}
            editSettings={editOptions}
            actionComplete={actionCompleteHandler}
            actionBegin={handleGridActionBegin}
            allowPaging
            allowSorting
            width={1100}
            
          >
            <ColumnsDirective>
              <ColumnDirective headerText="Cl. ID" field="ClientID"  textAlign="Center" width="100" freeze='Left' />
              <ColumnDirective field="Name" headerText="Client Name" width="150"  freeze='Left'/>
              <ColumnDirective field="Designation" headerText="Designation" width="150" />
              <ColumnDirective field="Country" headerText="Country" width="120" />
              <ColumnDirective field="CompanyName" headerText="Company Name" width="150" />
              <ColumnDirective field="UpdatedDate" headerText="Last Update" width="130" />
              <ColumnDirective field="TypeofDelegate" headerText="Type of Delegate" width="150" />
              <ColumnDirective field="program" headerText="Program" width="120" />
              <ColumnDirective field="followupstatus" headerText="Status" width="130" />
              <ColumnDirective field="Contact" headerText="Contact" width="130" />
              <ColumnDirective field="Email" headerText="Email" width="130" freeze='Right'/>
              
              <ColumnDirective headerText="Action" template={(props) => 
  <Sheetforleads 
    lead={props} 
    onUpdate={(updatedLead) => {
      setGridData(prevData => 
        prevData.map(item => item._id === updatedLead._id ? updatedLead : item)
      );
    }}
    refreshData={fetchData}
  />
} textAlign="Center" width="120" freeze='Right'/>
            </ColumnsDirective>
            
            <Inject services={[Page, Search, Toolbar, ExcelExport, Edit, Freeze]} />
          </GridComponent>
        )}
      </div>
    </div>
  );
}

export default Leadgenerate;