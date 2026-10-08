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
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import DeleteIcon from "@mui/icons-material/Delete";

import appointmentsData from "../data/appointments";
import patientsData from "../data/patients";
import doctorsData from "../data/doctors";

function Appointments() {
  // ==================================
  // APPOINTMENTS
  // ==================================

  const [appointments, setAppointments] =
    useState(() => {
      const saved =
        localStorage.getItem("appointments");

      if (saved) {
        return JSON.parse(saved);
      }

      localStorage.setItem(
        "appointments",
        JSON.stringify(appointmentsData)
      );

      return appointmentsData;
    });

  // ==================================
  // SEARCH & FILTERS
  // ==================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // ==================================
  // ADD APPOINTMENT DIALOG
  // ==================================

  const [openForm, setOpenForm] =
    useState(false);

  const [openConfirm, setOpenConfirm] =
    useState(false);

  // ==================================
  // FORM DATA
  // ==================================

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
    reason: "",
    type: "",
  });

  // ==================================
  // FORM ERRORS
  // ==================================

  const [errors, setErrors] = useState({});

  // ==================================
  // SUCCESS MESSAGE
  // ==================================

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==================================
  // SAVE TO LOCAL STORAGE
  // ==================================

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // ==================================
  // HANDLE FORM INPUT
  // ==================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  // ==================================
  // VALIDATION
  // ==================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patient) {
      newErrors.patient =
        "Please select a patient.";
    }

    if (!formData.doctor) {
      newErrors.doctor =
        "Please select a doctor.";
    }

    if (!formData.department) {
      newErrors.department =
        "Please select a department.";
    }

    if (!formData.date) {
      newErrors.date =
        "Please select a date.";
    }

    if (!formData.time) {
      newErrors.time =
        "Please select a time.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason =
        "Please enter the reason for the appointment.";
    }

    if (!formData.type) {
      newErrors.type =
        "Please select the appointment type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==================================
  // SUBMIT FORM
  // ==================================

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setOpenConfirm(true);
  };

  // ==================================
  // CONFIRM APPOINTMENT
  // ==================================

  const handleConfirmAppointment = () => {
    const newAppointment = {
      id: `A${Date.now()}`,
      patient: formData.patient,
      doctor: formData.doctor,
      department: formData.department,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      type: formData.type,
      status: "Pending",
    };

    setAppointments((current) => [
      ...current,
      newAppointment,
    ]);

    setOpenConfirm(false);
    setOpenForm(false);

    setFormData({
      patient: "",
      doctor: "",
      department: "",
      date: "",
      time: "",
      reason: "",
      type: "",
    });

    setErrors({});

    setSuccessMessage(
      "Appointment registered successfully."
    );
  };

  // ==================================
  // DELETE APPOINTMENT
  // ==================================

  const handleDeleteAppointment = (id) => {
    setAppointments((current) =>
      current.filter(
        (appointment) =>
          appointment.id !== id
      )
    );

    setSuccessMessage(
      "Appointment deleted successfully."
    );
  };

  // ==================================
  // FILTER APPOINTMENTS
  // ==================================

  const filteredAppointments =
    appointments.filter(
      (appointment) => {
        const searchText = search
          .toLowerCase()
          .trim();

        const matchesSearch =
          appointment.id
            .toLowerCase()
            .includes(searchText) ||
          appointment.patient
            .toLowerCase()
            .includes(searchText) ||
          appointment.doctor
            .toLowerCase()
            .includes(searchText) ||
          appointment.department
            .toLowerCase()
            .includes(searchText);

        const matchesStatus =
          status === "" ||
          appointment.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  // ==================================
  // STATUS COLOR
  // ==================================

  const getStatusColor = (
    appointmentStatus
  ) => {
    switch (appointmentStatus) {
      case "Scheduled":
        return "primary";

      case "Completed":
        return "success";

      case "Cancelled":
        return "error";

      case "Pending":
        return "warning";

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
            Appointments
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Register and manage hospital appointments
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          Register Appointment
        </Button>
      </Box>

      {/* ================================= */}
      {/* SEARCH & FILTERS */}
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
                md: "2fr 1fr",
              },
              gap: 2,
            }}
          >
            {/* SEARCH */}

            <TextField
              fullWidth
              label="Search appointments"
              placeholder="ID, patient, doctor or department"
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

                <MenuItem value="Scheduled">
                  Scheduled
                </MenuItem>

                <MenuItem value="Pending">
                  Pending
                </MenuItem>

                <MenuItem value="Completed">
                  Completed
                </MenuItem>

                <MenuItem value="Cancelled">
                  Cancelled
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* APPOINTMENT LIST */}
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
              Appointment List
            </Typography>

            <Typography color="text.secondary">
              {filteredAppointments.length} appointment(s)
            </Typography>
          </Box>

          {filteredAppointments.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
              }}
            >
              <EventIcon
                sx={{
                  fontSize: 60,
                  color: "text.secondary",
                }}
              />

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                No appointments found
              </Typography>
            </Box>
          ) : (
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
                        Appointment ID
                      </strong>
                    </TableCell>

                    <TableCell>
                      <strong>
                        Patient
                      </strong>
                    </TableCell>

                    <TableCell>
                      <strong>
                        Doctor
                      </strong>
                    </TableCell>

                    <TableCell>
                      <strong>
                        Department
                      </strong>
                    </TableCell>

                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Time</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Reason</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>

                    <TableCell align="center">
                      <strong>
                        Actions
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredAppointments.map(
                    (appointment) => (
                      <TableRow
                        key={appointment.id}
                        hover
                      >
                        <TableCell>
                          {appointment.id}
                        </TableCell>

                        <TableCell>
                          {appointment.patient}
                        </TableCell>

                        <TableCell>
                          {appointment.doctor}
                        </TableCell>

                        <TableCell>
                          {appointment.department}
                        </TableCell>

                        <TableCell>
                          {appointment.date}
                        </TableCell>

                        <TableCell>
                          {appointment.time}
                        </TableCell>

                        <TableCell>
                          {appointment.reason}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={
                              appointment.status
                            }
                            color={getStatusColor(
                              appointment.status
                            )}
                            size="small"
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="Delete appointment">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDeleteAppointment(
                                  appointment.id
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
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
      {/* REGISTER APPOINTMENT FORM */}
      {/* ================================= */}

      <Dialog
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Register New Appointment
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
              mt: 1,
            }}
          >
            {/* PATIENT */}

            <FormControl
              fullWidth
              error={Boolean(errors.patient)}
            >
              <InputLabel>
                Patient
              </InputLabel>

              <Select
                name="patient"
                value={formData.patient}
                label="Patient"
                onChange={handleChange}
              >
                {patientsData.map(
                  (patient) => (
                    <MenuItem
                      key={patient.id}
                      value={patient.name}
                    >
                      {patient.patientNumber} -{" "}
                      {patient.name}
                    </MenuItem>
                  )
                )}
              </Select>

              {errors.patient && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 0.5 }}
                >
                  {errors.patient}
                </Typography>
              )}
            </FormControl>

            {/* DOCTOR */}

            <FormControl
              fullWidth
              error={Boolean(errors.doctor)}
            >
              <InputLabel>
                Doctor
              </InputLabel>

              <Select
                name="doctor"
                value={formData.doctor}
                label="Doctor"
                onChange={handleChange}
              >
                {doctorsData.map(
                  (doctor) => (
                    <MenuItem
                      key={doctor.id}
                      value={doctor.name}
                    >
                      {doctor.name}
                    </MenuItem>
                  )
                )}
              </Select>

              {errors.doctor && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 0.5 }}
                >
                  {errors.doctor}
                </Typography>
              )}
            </FormControl>

            {/* DEPARTMENT */}

            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={Boolean(errors.department)}
              helperText={errors.department}
              placeholder="e.g. Internal Medicine"
            />

            {/* DATE */}

            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={Boolean(errors.date)}
              helperText={errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* TIME */}

            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              error={Boolean(errors.time)}
              helperText={errors.time}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* TYPE */}

            <FormControl
              fullWidth
              error={Boolean(errors.type)}
            >
              <InputLabel>
                Appointment Type
              </InputLabel>

              <Select
                name="type"
                value={formData.type}
                label="Appointment Type"
                onChange={handleChange}
              >
                <MenuItem value="Consultation">
                  Consultation
                </MenuItem>

                <MenuItem value="Follow-up">
                  Follow-up
                </MenuItem>

                <MenuItem value="Emergency">
                  Emergency
                </MenuItem>

                <MenuItem value="Check-up">
                  Check-up
                </MenuItem>

                <MenuItem value="Laboratory">
                  Laboratory
                </MenuItem>
              </Select>

              {errors.type && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mt: 0.5 }}
                >
                  {errors.type}
                </Typography>
              )}
            </FormControl>

            {/* REASON */}

            <TextField
              fullWidth
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              error={Boolean(errors.reason)}
              helperText={errors.reason}
              multiline
              rows={3}
              sx={{
                gridColumn: {
                  xs: "1",
                  sm: "1 / -1",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{ px: 3, pb: 3 }}
        >
          <Button
            onClick={() =>
              setOpenForm(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Register Appointment
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================= */}
      {/* CONFIRMATION DIALOG */}
      {/* ================================= */}

      <Dialog
        open={openConfirm}
        onClose={() =>
          setOpenConfirm(false)
        }
      >
        <DialogTitle>
          Confirm Appointment
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to register
            this appointment?
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography>
              <strong>Patient:</strong>{" "}
              {formData.patient}
            </Typography>

            <Typography>
              <strong>Doctor:</strong>{" "}
              {formData.doctor}
            </Typography>

            <Typography>
              <strong>Date:</strong>{" "}
              {formData.date}
            </Typography>

            <Typography>
              <strong>Time:</strong>{" "}
              {formData.time}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenConfirm(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={
              handleConfirmAppointment
            }
          >
            Confirm
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
          variant="filled"
          onClose={() =>
            setSuccessMessage("")
          }
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Appointments;