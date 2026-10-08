export const getPatients = (defaultPatients) => {
  try {
    const savedPatients = localStorage.getItem("patients");

    if (savedPatients) {
      return JSON.parse(savedPatients);
    }

    localStorage.setItem(
      "patients",
      JSON.stringify(defaultPatients)
    );

    return defaultPatients;
  } catch (error) {
    console.error("Error loading patients:", error);
    return defaultPatients;
  }
};

export const savePatients = (patients) => {
  try {
    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );
  } catch (error) {
    console.error("Error saving patients:", error);
  }
};

export const clearPatients = () => {
  localStorage.removeItem("patients");
};