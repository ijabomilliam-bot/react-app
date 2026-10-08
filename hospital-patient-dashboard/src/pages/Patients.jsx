import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
  CircularProgress,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { useNavigate } from "react-router-dom";

import patientsData from "../data/patients";
import departments from "../data/departments";
import PatientForm from "../components/PatientForm";

import {
  getPatients,
  savePatients,
} from "../utils/localStorage";

function Patients() {
  const navigate = useNavigate();

  // =========================
  // PATIENT STATE
  // =========================

  const [patients, setPatients] = useState(() =>
    getPatients(patientsData)
  );

  // =========================
  // FILTER STATE
  // =========================

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  // =========================
  // DIALOG STATE
  // =========================

  const [openAddForm, setOpenAddForm] = useState(false);

  const [openEditForm, setOpenEditForm] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] =
    useState(false);

  const [patientToDelete, setPatientToDelete] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =========================
  // NOTIFICATION STATE
  // =========================

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    savePatients(patients);
  }, [patients]);

  // =========================
  // ADD PATIENT
  // =========================

  const handleAddPatient = (newPatient) => {
    setPatients((currentPatients) => [
      ...currentPatients,
      newPatient,
    ]);

    setOpenAddForm(false);

    setSuccessMessage(
      "Patient added successfully."
    );
  };

  // =========================
  // OPEN EDIT
  // =========================

  const handleOpenEdit = (patient) => {
    setSelectedPatient(patient);
    setOpenEditForm(true);
  };

  // =========================
  // UPDATE PATIENT
  // =========================

  const handleUpdatePatient = (updatedPatient) => {
    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === updatedPatient.id
          ? updatedPatient
          : patient
      )
    );

    setOpenEditForm(false);

    setSelectedPatient(null);

    setSuccessMessage(
      "Patient updated successfully."
    );
  };

  // =========================
  // OPEN DELETE
  // =========================

  const handleOpenDelete = (patient) => {
    setPatientToDelete(patient);
    setOpenDeleteDialog(true);
  };

  // =========================
  // DELETE PATIENT
  // =========================

  const handleDeletePatient = () => {
    if (!patientToDelete) {
      return;
    }

    setDeleteLoading(true);

    setTimeout(() => {
      setPatients((currentPatients) =>
        currentPatients.filter(
          (patient) =>
            patient.id !== patientToDelete.id
        )
      );

      setDeleteLoading(false);

      setOpenDeleteDialog(false);

      setSuccessMessage(
        "Patient deleted successfully."
      );

      setPatientToDelete(null);
    }, 700);
  };

  // =========================
  // FILTER PATIENTS
  // =========================

  const filteredPatients = patients.filter(
    (patient) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        patient.patientNumber
          .toLowerCase()
          .includes(searchText) ||
        patient.name
          .toLowerCase()
          .includes(searchText) ||
        patient.doctor
          .toLowerCase()
          .includes(searchText) ||
        patient.department
          .toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        department === "" ||
        patient.department === department;

      const matchesStatus =
        status === "" ||
        patient.status === status;

      const matchesGender =
        gender === "" ||
        patient.gender === gender;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesGender
      );
    }
  );

  // =========================
  // CLEAR FILTERS
  // =========================

  const handleClearFilters = () => {
    setSearch("");
    setDepartment("");
    setStatus("");
    setGender("");
  };

  // =========================
  // STATUS CHIP COLOR
  // =========================

  const getStatusColor = (patientStatus) => {
    switch (patientStatus) {
      case "Admitted":
        return "primary";

      case "Discharged":
        return "success";

      case "Waiting":
        return "warning";

      case "Under Treatment":
        return "info";

      case "Emergency":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Patients
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Manage and monitor hospital patients
          </Typography>
        </Box>

        {/* ADD PATIENT BUTTON */}

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddForm(true)}
          sx={{
            minWidth: "170px",
            whiteSpace: "nowrap",
          }}
        >
          Add Patient
        </Button>
      </Box>

      {/* ================================= */}
      {/* SEARCH AND FILTERS */}
      {/* ================================= */}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Search & Filters
          </Typography>

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
              label="Search patients"
              placeholder="Name, number, doctor or department"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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

            {/* DEPARTMENT */}

            <FormControl fullWidth>
              <InputLabel>
                Department
              </InputLabel>

              <Select
                value={department}
                label="Department"
                onChange={(event) =>
                  setDepartment(event.target.value)
                }
              >
                <MenuItem value="">
                  All Departments
                </MenuItem>

                {departments.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* STATUS */}

            <FormControl fullWidth>
              <InputLabel>
                Status
              </InputLabel>

              <Select
                value={status}
                label="Status"
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <MenuItem value="">
                  All Statuses
                </MenuItem>

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
              </Select>
            </FormControl>

            {/* GENDER */}

            <FormControl fullWidth>
              <InputLabel>
                Gender
              </InputLabel>

              <Select
                value={gender}
                label="Gender"
                onChange={(event) =>
                  setGender(event.target.value)
                }
              >
                <MenuItem value="">
                  All Genders
                </MenuItem>

                <MenuItem value="Male">
                  Male
                </MenuItem>

                <MenuItem value="Female">
                  Female
                </MenuItem>
              </Select>
            </FormControl>

            {/* CLEAR BUTTON */}

            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              sx={{
                height: "56px",
                whiteSpace: "nowrap",
              }}
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* PATIENT LIST */}
      {/* ================================= */}

      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Patient List
            </Typography>

            <Typography
              color="text.secondary"
              fontWeight="bold"
            >
              {filteredPatients.length} patient(s)
            </Typography>
          </Box>

          {/* NO PATIENTS */}

          {filteredPatients.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
              >
                No patients found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Try changing your search or filters.
              </Typography>

              <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{ mt: 3 }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            /* ================================= */
            /* PATIENT TABLE */
            /* ================================= */

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
                      <strong>
                        Patient Number
                      </strong>
                    </TableCell>

                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Gender</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Age</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Department</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Doctor</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>

                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredPatients.map(
                    (patient) => (
                      <TableRow
                        key={patient.id}
                        hover
                      >
                        {/* PATIENT NUMBER */}

                        <TableCell>
                          {patient.patientNumber}
                        </TableCell>

                        {/* NAME */}

                        <TableCell>
                          <Typography
                            fontWeight="bold"
                          >
                            {patient.name}
                          </Typography>
                        </TableCell>

                        {/* GENDER */}

                        <TableCell>
                          {patient.gender}
                        </TableCell>

                        {/* AGE */}

                        <TableCell>
                          {patient.age}
                        </TableCell>

                        {/* DEPARTMENT */}

                        <TableCell>
                          {patient.department}
                        </TableCell>

                        {/* DOCTOR */}

                        <TableCell>
                          {patient.doctor}
                        </TableCell>

                        {/* STATUS */}

                        <TableCell>
                          <Chip
                            label={patient.status}
                            color={getStatusColor(
                              patient.status
                            )}
                            size="small"
                          />
                        </TableCell>

                        {/* ACTIONS */}

                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent:
                                "center",
                              gap: 0.5,
                            }}
                          >
                            {/* VIEW */}

                            <Tooltip title="View patient">
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  navigate(
                                    `/patients/${patient.id}`
                                  )
                                }
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>

                            {/* EDIT */}

                            <Tooltip title="Edit patient">
                              <IconButton
                                color="warning"
                                onClick={() =>
                                  handleOpenEdit(
                                    patient
                                  )
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            {/* DELETE */}

                            <Tooltip title="Delete patient">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  handleOpenDelete(
                                    patient
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* ADD PATIENT DIALOG */}
      {/* ================================= */}

      <Dialog
        open={openAddForm}
        onClose={() =>
          setOpenAddForm(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Add New Patient
        </DialogTitle>

        <DialogContent>
          <PatientForm
            onSave={handleAddPatient}
            onCancel={() =>
              setOpenAddForm(false)
            }
          />
        </DialogContent>
      </Dialog>

      {/* ================================= */}
      {/* EDIT PATIENT DIALOG */}
      {/* ================================= */}

      <Dialog
        open={openEditForm}
        onClose={() =>
          setOpenEditForm(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Edit Patient
        </DialogTitle>

        <DialogContent>
          {selectedPatient && (
            <PatientForm
              initialData={selectedPatient}
              isEdit={true}
              onSave={handleUpdatePatient}
              onCancel={() => {
                setOpenEditForm(false);
                setSelectedPatient(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ================================= */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ================================= */}

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          if (!deleteLoading) {
            setOpenDeleteDialog(false);
            setPatientToDelete(null);
          }
        }}
      >
        <DialogTitle>
          Delete Patient
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>
              {patientToDelete?.name}
            </strong>
            ?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            This patient will be removed from the
            patient list.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              setPatientToDelete(null);
            }}
            disabled={deleteLoading}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeletePatient}
            disabled={deleteLoading}
            startIcon={
              deleteLoading ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : (
                <DeleteIcon />
              )
            }
          >
            {deleteLoading
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ================================= */}

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() =>
          setSuccessMessage("")
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
          onClose={() =>
            setSuccessMessage("")
          }
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* ================================= */}
      {/* ERROR MESSAGE */}
      {/* ================================= */}

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={() =>
          setErrorMessage("")
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity="error"
          onClose={() =>
            setErrorMessage("")
          }
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Patients;