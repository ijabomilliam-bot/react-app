import { useEffect, useState } from "react";

import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import doctors from "../data/doctors";
import departments from "../data/departments";


function PatientForm({
  onSave,
  onCancel,
  initialData = null,
  isEdit = false,
}) {

  const [formData, setFormData] = useState({
    patientNumber: "",
    name: "",
    gender: "",
    dob: "",
    age: "",
    phone: "",
    address: "",
    department: "",
    doctor: "",
    bloodGroup: "",
    status: "",
  });


  const [errors, setErrors] = useState({});

  const [loading, setLoading] =
    useState(false);


  // =========================================================
  // LOAD DATA WHEN EDITING
  // =========================================================

  useEffect(() => {

    if (initialData) {

      setFormData({
        patientNumber:
          initialData.patientNumber || "",

        name:
          initialData.name || "",

        gender:
          initialData.gender || "",

        dob:
          initialData.dob || "",

        age:
          initialData.age || "",

        phone:
          initialData.phone || "",

        address:
          initialData.address || "",

        department:
          initialData.department || "",

        doctor:
          initialData.doctor || "",

        bloodGroup:
          initialData.bloodGroup || "",

        status:
          initialData.status || "",
      });

    }

  }, [initialData]);


  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));


    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

  };


  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {

    const newErrors = {};


    if (!formData.patientNumber.trim()) {
      newErrors.patientNumber =
        "Patient number is required";
    }


    if (!formData.name.trim()) {
      newErrors.name =
        "Full name is required";
    }


    if (!formData.gender) {
      newErrors.gender =
        "Please select gender";
    }


    if (!formData.dob) {
      newErrors.dob =
        "Date of birth is required";
    }


    if (!formData.age) {
      newErrors.age =
        "Age is required";
    }


    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }


    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }


    if (!formData.department) {
      newErrors.department =
        "Please select department";
    }


    if (!formData.doctor) {
      newErrors.doctor =
        "Please select doctor";
    }


    if (!formData.bloodGroup) {
      newErrors.bloodGroup =
        "Please select blood group";
    }


    if (!formData.status) {
      newErrors.status =
        "Please select status";
    }


    setErrors(newErrors);


    return (
      Object.keys(newErrors).length === 0
    );

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (event) => {

    event.preventDefault();


    if (!validateForm()) {
      return;
    }


    setLoading(true);


    const patientData = {

      // Keep existing ID when editing
      id:
        initialData?.id ||
        `P${Date.now()}`,

      patientNumber:
        formData.patientNumber,

      name:
        formData.name,

      gender:
        formData.gender,

      age:
        Number(formData.age),

      dob:
        formData.dob,

      phone:
        formData.phone,

      address:
        formData.address,

      department:
        formData.department,

      doctor:
        formData.doctor,

      bloodGroup:
        formData.bloodGroup,

      status:
        formData.status,

      // Keep original admission date
      // when editing
      admissionDate:
        initialData?.admissionDate ||
        new Date()
          .toISOString()
          .split("T")[0],
    };


    setTimeout(() => {

      onSave(patientData);

      setLoading(false);

    }, 700);

  };


  // =========================================================
  // FILTER DOCTORS BY DEPARTMENT
  // =========================================================

  const filteredDoctors =
    doctors.filter(
      (doctor) =>
        !formData.department ||
        doctor.department ===
          formData.department
    );


  // =========================================================
  // FORM
  // =========================================================

  return (

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1 }}
    >

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 2,
        }}
      >

        {/* PATIENT NUMBER */}

        <TextField
          label="Patient Number"
          name="patientNumber"
          value={formData.patientNumber}
          onChange={handleChange}
          error={Boolean(
            errors.patientNumber
          )}
          helperText={
            errors.patientNumber
          }
          fullWidth
        />


        {/* NAME */}

        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
        />


        {/* GENDER */}

        <TextField
          select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          error={Boolean(errors.gender)}
          helperText={errors.gender}
          fullWidth
        >

          <MenuItem value="Male">
            Male
          </MenuItem>

          <MenuItem value="Female">
            Female
          </MenuItem>

        </TextField>


        {/* DOB */}

        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          error={Boolean(errors.dob)}
          helperText={errors.dob}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />


        {/* AGE */}

        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={Boolean(errors.age)}
          helperText={errors.age}
          fullWidth
        />


        {/* PHONE */}

        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          fullWidth
        />


        {/* ADDRESS */}

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
          fullWidth
        />


        {/* DEPARTMENT */}

        <TextField
          select
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          error={Boolean(
            errors.department
          )}
          helperText={
            errors.department
          }
          fullWidth
        >

          {departments.map(
            (department) => (

              <MenuItem
                key={department.id}
                value={department.name}
              >
                {department.name}
              </MenuItem>

            )
          )}

        </TextField>


        {/* DOCTOR */}

        <TextField
          select
          label="Doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          error={Boolean(errors.doctor)}
          helperText={errors.doctor}
          fullWidth
        >

          {filteredDoctors.map(
            (doctor) => (

              <MenuItem
                key={doctor.id}
                value={doctor.name}
              >
                {doctor.name}
              </MenuItem>

            )
          )}

        </TextField>


        {/* BLOOD GROUP */}

        <TextField
          select
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          error={Boolean(
            errors.bloodGroup
          )}
          helperText={
            errors.bloodGroup
          }
          fullWidth
        >

          <MenuItem value="A+">
            A+
          </MenuItem>

          <MenuItem value="A-">
            A-
          </MenuItem>

          <MenuItem value="B+">
            B+
          </MenuItem>

          <MenuItem value="B-">
            B-
          </MenuItem>

          <MenuItem value="AB+">
            AB+
          </MenuItem>

          <MenuItem value="AB-">
            AB-
          </MenuItem>

          <MenuItem value="O+">
            O+
          </MenuItem>

          <MenuItem value="O-">
            O-
          </MenuItem>

        </TextField>


        {/* STATUS */}

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={Boolean(errors.status)}
          helperText={errors.status}
          fullWidth
        >

          <MenuItem value="Admitted">
            Admitted
          </MenuItem>

          <MenuItem value="Discharged">
            Discharged
          </MenuItem>

          <MenuItem value="Waiting">
            Waiting
          </MenuItem>

          <MenuItem value="Under Treatment">
            Under Treatment
          </MenuItem>

          <MenuItem value="Emergency">
            Emergency
          </MenuItem>

        </TextField>

      </Box>


      {/* BUTTONS */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 3,
          mb: 1,
        }}
      >

        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>


        <Button
          type="submit"
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress
                size={20}
                color="inherit"
              />
            ) : (
              <SaveIcon />
            )
          }
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : isEdit
            ? "Update Patient"
            : "Save Patient"}

        </Button>

      </Box>

    </Box>

  );
}

export default PatientForm;