import { useMemo, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";

import medicalRecordsData from "../data/medicalRecords";
import patientsData from "../data/patients";
import doctorsData from "../data/doctors";
import departmentsData from "../data/departments";

function MedicalRecords() {
  const [search, setSearch] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredRecords = useMemo(() => {
    return medicalRecordsData.filter((record) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        record.id.toLowerCase().includes(searchText) ||
        record.patient.toLowerCase().includes(searchText) ||
        record.doctor.toLowerCase().includes(searchText) ||
        record.diagnosis.toLowerCase().includes(searchText) ||
        record.treatment.toLowerCase().includes(searchText);

      const matchesPatient =
        patientFilter === "" ||
        record.patient === patientFilter;

      const matchesDoctor =
        doctorFilter === "" ||
        record.doctor === doctorFilter;

      const patient = patientsData.find(
        (p) => p.name === record.patient
      );

      const recordDepartment = patient
        ? patient.department
        : "";

      const matchesDepartment =
        departmentFilter === "" ||
        recordDepartment === departmentFilter;

      return (
        matchesSearch &&
        matchesPatient &&
        matchesDoctor &&
        matchesDepartment
      );
    });
  }, [
    search,
    patientFilter,
    doctorFilter,
    departmentFilter,
  ]);

  const clearFilters = () => {
    setSearch("");
    setPatientFilter("");
    setDoctorFilter("");
    setDepartmentFilter("");
  };

  return (
    <Box>
      {/* PAGE HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Medical Records
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            View and manage patient medical records
          </Typography>
        </Box>

        <Chip
          icon={<DescriptionIcon />}
          label={`${filteredRecords.length} Records`}
          color="primary"
        />
      </Box>

      {/* SEARCH AND FILTERS */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr auto",
            },
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* SEARCH */}
          <TextField
            fullWidth
            label="Search records"
            placeholder="Search by ID, patient, doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{
                    mr: 1,
                    color: "text.secondary",
                  }}
                />
              ),
            }}
          />

          {/* PATIENT FILTER */}
          <TextField
            select
            fullWidth
            label="Patient"
            value={patientFilter}
            onChange={(e) =>
              setPatientFilter(e.target.value)
            }
          >
            <MenuItem value="">
              All Patients
            </MenuItem>

            {patientsData.map((patient) => (
              <MenuItem
                key={patient.id}
                value={patient.name}
              >
                {patient.name}
              </MenuItem>
            ))}
          </TextField>

          {/* DOCTOR FILTER */}
          <TextField
            select
            fullWidth
            label="Doctor"
            value={doctorFilter}
            onChange={(e) =>
              setDoctorFilter(e.target.value)
            }
          >
            <MenuItem value="">
              All Doctors
            </MenuItem>

            {doctorsData.map((doctor) => (
              <MenuItem
                key={doctor.id}
                value={doctor.name}
              >
                {doctor.name}
              </MenuItem>
            ))}
          </TextField>

          {/* DEPARTMENT FILTER */}
          <TextField
            select
            fullWidth
            label="Department"
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            <MenuItem value="">
              All Departments
            </MenuItem>

            {departmentsData.map((department) => (
              <MenuItem
                key={department.id}
                value={department.name}
              >
                {department.name}
              </MenuItem>
            ))}
          </TextField>

          {/* CLEAR BUTTON */}
          <Button
            variant="outlined"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Box>
      </Paper>

      {/* RECORDS TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Record ID</strong>
              </TableCell>

              <TableCell>
                <strong>Patient</strong>
              </TableCell>

              <TableCell>
                <strong>Date</strong>
              </TableCell>

              <TableCell>
                <strong>Doctor</strong>
              </TableCell>

              <TableCell>
                <strong>Diagnosis</strong>
              </TableCell>

              <TableCell>
                <strong>Treatment</strong>
              </TableCell>

              <TableCell>
                <strong>Prescription</strong>
              </TableCell>

              <TableCell>
                <strong>Notes</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow
                  key={record.id}
                  hover
                >
                  <TableCell>
                    <Chip
                      label={record.id}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {record.patient}
                  </TableCell>

                  <TableCell>
                    {record.date}
                  </TableCell>

                  <TableCell>
                    {record.doctor}
                  </TableCell>

                  <TableCell>
                    {record.diagnosis}
                  </TableCell>

                  <TableCell>
                    {record.treatment}
                  </TableCell>

                  <TableCell>
                    {record.prescription}
                  </TableCell>

                  <TableCell>
                    {record.notes}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                >
                  <Box sx={{ py: 5 }}>
                    <DescriptionIcon
                      sx={{
                        fontSize: 50,
                        color: "text.secondary",
                        mb: 1,
                      }}
                    />

                    <Typography
                      variant="h6"
                    >
                      No medical records found
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Try changing your search
                      or filters.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MedicalRecords;