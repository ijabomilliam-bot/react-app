import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BusinessIcon from "@mui/icons-material/Business";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WarningIcon from "@mui/icons-material/Warning";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import patients from "../data/patients";
import doctors from "../data/doctors";
import appointments from "../data/appointments";
import departments from "../data/departments";

const chartColors = ["#0f766e", "#2563eb", "#d97706", "#dc2626", "#7c3aed", "#475569"];

function StatCard({ title, value, icon, color }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", borderColor: "divider", borderRadius: 2, boxShadow: "none" }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, "&:last-child": { pb: { xs: 1.5, sm: 2 } } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ width: 40, height: 40, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: 1.5, color, bgcolor: `${color}14`, "& svg": { fontSize: 21 } }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function ChartPanel({ title, children }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", borderColor: "divider", borderRadius: 2, boxShadow: "none" }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ width: "100%", height: { xs: 250, sm: 280 }, minWidth: 0 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function countByDate(items, dateKey, valueKey) {
  return Object.entries(
    items.reduce((totals, item) => {
      const date = item[dateKey];
      totals[date] = (totals[date] || 0) + 1;
      return totals;
    }, {})
  )
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .map(([date, total]) => ({ day: formatDate(date), [valueKey]: total }));
}

function Dashboard() {
  const availableDoctors = doctors.filter((doctor) => doctor.availability === "Available").length;
  const admittedPatients = patients.filter((patient) => patient.status === "Admitted").length;
  const dischargedPatients = patients.filter((patient) => patient.status === "Discharged").length;
  const emergencyPatients = patients.filter((patient) => patient.status === "Emergency").length;
  const pendingAppointments = appointments.filter((appointment) => appointment.status === "Pending").length;

  const statistics = [
    { title: "Total Patients", value: patients.length, icon: <PeopleIcon />, color: "#2563eb" },
    { title: "Appointments", value: appointments.length, icon: <EventIcon />, color: "#0f766e" },
    { title: "Available Doctors", value: availableDoctors, icon: <MedicalServicesIcon />, color: "#7c3aed" },
    { title: "Departments", value: departments.length, icon: <BusinessIcon />, color: "#d97706" },
    { title: "Admitted", value: admittedPatients, icon: <LocalHospitalIcon />, color: "#0f766e" },
    { title: "Discharged", value: dischargedPatients, icon: <ExitToAppIcon />, color: "#2563eb" },
    { title: "Emergency", value: emergencyPatients, icon: <WarningIcon />, color: "#dc2626" },
    { title: "Pending Appointments", value: pendingAppointments, icon: <PendingActionsIcon />, color: "#d97706" },
  ];

  const departmentData = departments.map((department) => ({
    name: department.name,
    patients: patients.filter((patient) => patient.department === department.name).length,
  }));
  const appointmentsByDate = countByDate(appointments, "date", "appointments");
  const admissionsByDate = countByDate(patients, "admissionDate", "patients");
  const genderData = ["Female", "Male"].map((gender) => ({
    name: gender,
    value: patients.filter((patient) => patient.gender === gender).length,
  }));

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Hospital overview
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {statistics.map((stat) => (
          <Grid key={stat.title} size={{ xs: 6, sm: 3, lg: 1.5 }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPanel title="Patients by department">
            <ResponsiveContainer>
              <BarChart data={departmentData} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
                <CartesianGrid horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={105} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="patients" name="Patients" fill={chartColors[0]} radius={[0, 4, 4, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPanel title="Appointments by date">
            <ResponsiveContainer>
              <BarChart data={appointmentsByDate} margin={{ top: 8, right: 8, bottom: 4, left: -20 }}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="appointments" name="Appointments" fill={chartColors[1]} radius={[4, 4, 0, 0]} maxBarSize={42} />
              </BarChart>
            </ResponsiveContainer>
          </ChartPanel>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPanel title="Patient gender">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="46%" innerRadius={54} outerRadius={88} paddingAngle={3}>
                  {genderData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={30} />
              </PieChart>
            </ResponsiveContainer>
          </ChartPanel>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartPanel title="Admissions by date">
            <ResponsiveContainer>
              <LineChart data={admissionsByDate} margin={{ top: 8, right: 12, bottom: 4, left: -20 }}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="patients" name="Admissions" stroke={chartColors[2]} strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;