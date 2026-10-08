import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Button,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";

import doctorsData from "../data/doctors";
import departmentsData from "../data/departments";

function Doctors() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [availability, setAvailability] =
    useState("");

  // ==================================
  // FILTER DOCTORS
  // ==================================

  const filteredDoctors = doctorsData.filter(
    (doctor) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        doctor.name
          .toLowerCase()
          .includes(searchText) ||
        doctor.specialization
          .toLowerCase()
          .includes(searchText) ||
        doctor.department
          .toLowerCase()
          .includes(searchText) ||
        doctor.id
          .toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        department === "" ||
        doctor.department === department;

      const matchesAvailability =
        availability === "" ||
        doctor.availability === availability;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesAvailability
      );
    }
  );

  // ==================================
  // AVAILABILITY COLOR
  // ==================================

  const getAvailabilityColor = (
    doctorAvailability
  ) => {
    switch (doctorAvailability) {
      case "Available":
        return "success";

      case "Busy":
        return "warning";

      case "On Leave":
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

      <Box sx={{ mb: 4 }}>
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
          Doctors
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Manage and monitor hospital doctors
        </Typography>
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
                md: "2fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            {/* SEARCH */}

            <TextField
              fullWidth
              label="Search doctors"
              placeholder="Name, ID, specialization or department"
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

                {departmentsData.map(
                  (item) => (
                    <MenuItem
                      key={item.id}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            {/* AVAILABILITY */}

            <FormControl fullWidth>
              <InputLabel>
                Availability
              </InputLabel>

              <Select
                value={availability}
                label="Availability"
                onChange={(event) =>
                  setAvailability(
                    event.target.value
                  )
                }
              >
                <MenuItem value="">
                  All
                </MenuItem>

                <MenuItem value="Available">
                  Available
                </MenuItem>

                <MenuItem value="Busy">
                  Busy
                </MenuItem>

                <MenuItem value="On Leave">
                  On Leave
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* ================================= */}
      {/* DOCTOR COUNT */}
      {/* ================================= */}

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
          Doctor List
        </Typography>

        <Typography color="text.secondary">
          {filteredDoctors.length} doctor(s)
        </Typography>
      </Box>

      {/* ================================= */}
      {/* DOCTOR CARDS */}
      {/* ================================= */}

      {filteredDoctors.length === 0 ? (
        <Card>
          <CardContent
            sx={{
              textAlign: "center",
              py: 6,
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No doctors found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Try changing your search or filters.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              onClick={() => {
                setSearch("");
                setDepartment("");
                setAvailability("");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredDoctors.map(
            (doctor) => (
              <Grid
                key={doctor.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition:
                      "transform 0.2s",
                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent>
                    {/* DOCTOR HEADER */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor:
                            "primary.main",
                        }}
                      >
                        <MedicalServicesIcon />
                      </Avatar>

                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          {doctor.name}
                        </Typography>

                        <Typography
                          color="text.secondary"
                        >
                          ID: {doctor.id}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* SPECIALIZATION */}

                    <Typography
                      sx={{ mb: 1.5 }}
                    >
                      <strong>
                        Specialization:
                      </strong>{" "}
                      {doctor.specialization}
                    </Typography>

                    {/* DEPARTMENT */}

                    <Typography
                      sx={{ mb: 1.5 }}
                    >
                      <strong>
                        Department:
                      </strong>{" "}
                      {doctor.department}
                    </Typography>

                    {/* PHONE */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <PhoneIcon
                        fontSize="small"
                        color="primary"
                      />

                      <Typography>
                        {doctor.phone}
                      </Typography>
                    </Box>

                    {/* EMAIL */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >
                      <EmailIcon
                        fontSize="small"
                        color="primary"
                      />

                      <Typography
                        sx={{
                          wordBreak:
                            "break-word",
                        }}
                      >
                        {doctor.email}
                      </Typography>
                    </Box>

                    {/* ASSIGNED PATIENTS */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <PeopleIcon
                        fontSize="small"
                        color="primary"
                      />

                      <Typography>
                        <strong>
                          Assigned Patients:
                        </strong>{" "}
                        {
                          doctor.assignedPatients
                        }
                      </Typography>
                    </Box>

                    {/* AVAILABILITY */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        mt: 2,
                      }}
                    >
                      <Chip
                        label={
                          doctor.availability
                        }
                        color={getAvailabilityColor(
                          doctor.availability
                        )}
                      />

                      <Button
                        size="small"
                        startIcon={
                          <VisibilityIcon />
                        }
                        variant="outlined"
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Box>
  );
}

export default Doctors;