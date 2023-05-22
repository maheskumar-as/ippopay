import axios from "axios";

const API_ENDPOINT = "http://localhost:3006";
// Function to add data to the server
export const addData = async (data) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/add`, data);
    console.log("Entry added successfully");
    return response.data;
  } catch (error) {
    console.error("Error adding entry:", error);
    throw error;
  }
};

// Function to retrieve data from the server
export const retrieveData = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/retrieve`);
    const entries = response.data;
    console.log("Retrieved entries:", entries);
    return entries;
  } catch (error) {
    console.error("Error retrieving entries:", error);
    throw error;
  }
};
