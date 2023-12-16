import React, { useState } from "react";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    dateOfJoining: "",
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.department ||
      !formData.dateOfJoining
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (editMode) {
      const updatedList = [...employeeList];
      updatedList[editIndex] = formData;
      setEmployeeList(updatedList);
      setEditMode(false);
      setEditIndex(null);
    } else {
      const newEmployee = { ...formData };
      setEmployeeList([...employeeList, newEmployee]);
    }
    setFormData({
      name: "",
      age: "",
      department: "",
      dateOfJoining: "",
    });
  };

  const handleEdit = (item, index) => {
    setFormData(item);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = employeeList.filter((_, i) => i !== index);
    setEmployeeList(updatedList);
  };

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      department: "",
      dateOfJoining: "",
    });
    setEditMode(false);
    setEditIndex(null);
  };

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column2",
      name: "Age",
      fieldName: "age",
      minWidth: 50,
      maxWidth: 100,
    },
    {
      key: "column3",
      name: "Department",
      fieldName: "department",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column4",
      name: "Date of Joining",
      fieldName: "dateOfJoining",
      minWidth: 100,
      maxWidth: 200,
    },
    {
      key: "column5",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
      onRender: (item, index) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <DefaultButton onClick={() => handleEdit(item, index)}>
            Edit
          </DefaultButton>
          <DefaultButton onClick={() => handleDelete(index)}>
            Delete
          </DefaultButton>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Employee Data Form</h1>
      <div className="fields-container">
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <TextField
          label="Age"
          value={formData.age}
          onChange={(e) => handleInputChange(e, "age")}
        />
        <TextField
          label="Department"
          value={formData.department}
          onChange={(e) => handleInputChange(e, "department")}
        />
        <TextField
          label="Date of Joining"
          value={formData.dateOfJoining}
          onChange={(e) => handleInputChange(e, "dateOfJoining")}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <PrimaryButton onClick={handleSave}>
          {editMode ? "Update" : "Save"}
        </PrimaryButton>{" "}
        <DefaultButton onClick={handleClear}>Clear</DefaultButton>
      </div>

      <DetailsList
        items={employeeList}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default EmployeeForm;
