import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImSpinner8 } from "react-icons/im";
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function Sheetforleads({ lead, onUpdate, refreshData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setEditedLead(lead);
  }, [lead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setEditedLead(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const updatedLead = {
        ...editedLead,
        UpdatedDate: new Date().toLocaleString()
      };
      await axios.put(`http://localhost:3001/leads/update/${updatedLead._id}`, updatedLead);
      onUpdate(updatedLead);
      setIsEditing(false);
      setIsOpen(false); // Close the sheet
      refreshData(); // Refresh the data table
    } catch (error) {
      console.error('Error updating lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-bold'>Client Details</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Edit client details here. Click update when you\'re done.' : 'View client details here.'}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Name" className="text-right">Name</Label>
            <Input
              id="Name"
              name="Name"
              value={editedLead.Name}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Contact" className="text-right">Contact</Label>
            <Input
              id="Contact"
              name="Contact"
              value={editedLead.Contact}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right">Email</Label>
            <Input
              id="Email"
              name="Email"
              value={editedLead.Email}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="CompanyName" className="text-right">Company</Label>
            <Input
              id="CompanyName"
              name="CompanyName"
              value={editedLead.CompanyName}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Country" className="text-right">Country</Label>
            <Input
              id="Country"
              name="Country"
              value={editedLead.Country}
              onChange={handleInputChange}
              className="col-span-3"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TypeofDelegate" className="text-right">Delegate</Label>
            <Select
              onValueChange={(value) => handleSelectChange('TypeofDelegate', value)}
              value={editedLead.TypeofDelegate}
              disabled={!isEditing}
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
            <Label htmlFor="Designation" className="text-right">Designation</Label>
            <Select
              onValueChange={(value) => handleSelectChange('Designation', value)}
              value={editedLead.Designation}
              disabled={!isEditing}
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
            <Label htmlFor="program" className="text-right">Program</Label>
            <Select
              onValueChange={(value) => handleSelectChange('program', value)}
              value={editedLead.program}
              disabled={!isEditing}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="followupstatus" className="text-right">Status</Label>
            <Select
              onValueChange={(value) => handleSelectChange('followupstatus', value)}
              value={editedLead.followupstatus}
              disabled={!isEditing}
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
        <SheetFooter>
          {isEditing ? (
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex'>
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />Update
                </div>
              ) : (
                'Update'
              )}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}