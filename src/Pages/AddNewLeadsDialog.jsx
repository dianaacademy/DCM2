import React, { useState } from 'react';
import axios from 'axios';
import { ImSpinner8 } from "react-icons/im";
import { Button } from '../../src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../src/components/ui/dialog';
import { Label } from '../../src/components/ui/label';
import { Input } from '../../src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../src/components/ui/select';

const AddNewLeadsDialog = ({ fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRecord, setNewRecord] = useState({
    ClientID: '',
    Name: '',
    Designation: '',
    Country: '',
    CompanyName: '',
    TypeofDelegate: '',
    UpdatedDate: new Date().toLocaleString(),
    program: '',
    followupstatus: '',
    Contact: '',
    Email: '',
  });

  const generateClientID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleNewRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({ ...prev, [name]: value }));
  };

  const handleNewRecordSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { Name, Contact, CompanyName, program, followupstatus } = newRecord;
    if (!Name || !Contact || !CompanyName || !program || !followupstatus) {
        alert('Please fill in all required fields: Name, Contact, Company, Program, and Status.');
        return; 
    }

    setIsSubmitting(true);
    try {
      const clientID = generateClientID();
      const recordWithID = { ...newRecord, ClientID: clientID };
      await axios.post('http://localhost:3001/LeadManagement', recordWithID);
      setShowModal(false);
      setNewRecord({
        ClientID: '',
        Name: '',
        Designation: '',
        Country: '',
        CompanyName: '',
        TypeofDelegate: '',
        UpdatedDate: new Date().toLocaleString(),
        program: '',
        followupstatus: '',
        Contact: '',
        Email: '',
      });
      fetchData();
    } catch (err) {
      console.error('Error adding record:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button>Add New Leads</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Add New Leads</DialogTitle>
          <DialogDescription>
            Add all details and save the leads
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewRecordSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Name" className="text-right">
                Name
              </Label>
              <Input
                id="Name"
                name="Name"
                value={newRecord.Name}
                onChange={handleNewRecordChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Contact" className="text-right">
                Contact
              </Label>
              <Input
                id="Contact"
                name="Contact"
                value={newRecord.Contact}
                onChange={handleNewRecordChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Email" className="text-right">
                Email
              </Label>
              <Input
                id="Email"
                name="Email"
                value={newRecord.Email}
                onChange={handleNewRecordChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="CompanyName" className="text-right">
                Company
              </Label>
              <Input
                id="CompanyName"
                name="CompanyName"
                value={newRecord.CompanyName}
                onChange={handleNewRecordChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Country" className="text-right">
                Country
              </Label>
              <Input
                id="Country"
                name="Country"
                value={newRecord.Country}
                onChange={handleNewRecordChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="TypeofDelegate" className="text-right">
                Delegate
              </Label>
              <Select
                onValueChange={(value) => handleNewRecordChange({ target: { name: 'TypeofDelegate', value } })}
                value={newRecord.TypeofDelegate}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Types of Delegate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types of Delegate</SelectLabel>
                    <SelectItem value="Students">Students</SelectItem>
                    <SelectItem value="Delegate">Delegate</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Designation" className="text-right">
                Designation
              </Label>
              <Select
                onValueChange={(value) => handleNewRecordChange({ target: { name: 'Designation', value } })}
                value={newRecord.Designation}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Designation</SelectLabel>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">
                Program
              </Label>
              <Select
                onValueChange={(value) => handleNewRecordChange({ target: { name: 'program', value } })}
                value={newRecord.program}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Program</SelectLabel>
                    <SelectItem value="DCLP">DCLP</SelectItem>
                    <SelectItem value="DCBT">DCBT</SelectItem>
                    <SelectItem value="DJP">DJP</SelectItem>
                    <SelectItem value="DTA">DTA</SelectItem>
                    <SelectItem value="TEKFINIX">TEKFINIX</SelectItem>
                    <SelectItem value="DSAE">DSAE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid-cols-4 items-center gap-4 hidden">
              <Label htmlFor="ClientID" className="text-right">
                Client ID
              </Label>
              <Input
                id="ClientID"
                name="ClientID"
                value="Will be generated"
                readOnly
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="followupstatus" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) => handleNewRecordChange({ target: { name: 'followupstatus', value } })}
                value={newRecord.followupstatus}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Follow up Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Follow up Status</SelectLabel>
                    <SelectItem value="freshleads">Fresh leads</SelectItem>
                    <SelectItem value="instrested">Interested</SelectItem>
                    <SelectItem value="followuptoday">Follow up Today</SelectItem>
                    <SelectItem value="followupoverdues">Follow up Overdues</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex' >
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />Save 
                </div>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewLeadsDialog;