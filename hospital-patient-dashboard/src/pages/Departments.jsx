import { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";

import departmentsData from "../data/departments";

function Departments() {
  const [search, setSearch] = useState("");

  // Filter departments using search
  const filteredDepartments = departmentsData.filter(
    (department) => {
      const searchText = search
        .toLowerCase()
        .trim();

      return (
        department.name
          .toLowerCase()
          .includes(searchText) ||
        department.code
          .toLowerCase()
          .includes(searchText) ||
        department.head
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* ============================= */}
      {/* PAGE HEADER */}
      {/* ============================= */}

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
          Departments
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Manage and monitor hospital departments
        </Typography>
      </Box>

      {/* ============================= */}
      {/* SEARCH */}
      {/* ============================= */}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Search Departments
          </Typography>

          <TextField
            fullWidth
            label="Search department"
            placeholder="Search by name, code or department head"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {search && (
            <Button
              sx={{ mt: 2 }}
              onClick={() => setSearch("")}
            >
              Clear Search
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ============================= */}
      {/* DEPARTMENT COUNT */}
      {/* ============================= */}

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
          Hospital Departments
        </Typography>

        <Typography color="text.secondary">
          {filteredDepartments.length} department(s)
        </Typography>
      </Box>

      {/* ============================= */}
      {/* DEPARTMENT CARDS */}
      {/* ============================= */}

      {filteredDepartments.length === 0 ? (
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
              No departments found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Try another search.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredDepartments.map(
            (department) => (
              <Grid
                key={department.id}
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
                    {/* DEPARTMENT TITLE */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "center",
                          bgcolor:
                            "primary.main",
                          color: "white",
                        }}
                      >
                        <LocalHospitalIcon />
                      </Box>

                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          {department.name}
                        </Typography>

                        <Typography
                          color="text.secondary"
                        >
                          Code:{" "}
                          {department.code}
                        </Typography>
                      </Box>
                    </Box>

                    {/* STATUS */}

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={department.status}
                        color={
                          department.status ===
                          "Active"
                            ? "success"
                            : "default"
                        }
                        size="small"
                      />
                    </Box>


                    {/* DEPARTMENT HEAD */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <MedicalServicesIcon
                        fontSize="small"
                        color="primary"
                      />

                      <Typography>
                        <strong>
                          Head:
                        </strong>{" "}
                        {department.head}
                      </Typography>
                    </Box>

                    {/* DOCTORS */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
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
                          Doctors:
                        </strong>{" "}
                        {department.doctorCount}
                      </Typography>
                    </Box>

                    {/* PATIENTS */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
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
                          Patients:
                        </strong>{" "}
                        {department.patientCount}
                      </Typography>
                    </Box>

                    {/* CONTACT */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <PhoneIcon
                        fontSize="small"
                        color="primary"
                      />

                      <Typography>
                        <strong>
                          Contact:
                        </strong>{" "}
                        {department.contact}
                      </Typography>
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

export default Departments;