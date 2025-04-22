import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import logo from "./logo.png";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", { name, course });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#e0f7fa", minHeight: "100vh", padding: "30px" }}>
      <img src={logo} alt="Logo" style={{ width: "200px", marginBottom: "0px" }} />
      <h1 style={{ color: "#006064" }}>Student Recording System</h1>
      <div style={{ color: "#004d40" }}>
        <StudentForm addStudent={addStudent} />
        <StudentList students={students} />
      </div>
    </div>
  );
};

export default App;