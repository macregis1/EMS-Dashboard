import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,  Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentCard = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("/api/admin/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.log("error fetching employees", error.message);
            }
        };
        fetchEmployees();
    }, []);

    // Categorizing employees by department, role, and responsibility
    const departments = employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
    }, {});

    // Creating data for the pie charts
    const employeeDepartmentData = {
        labels: Object.keys(departments),
        datasets: [
            {
                data: Object.values(departments),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };
    return (
        <>
        <Pie data={employeeDepartmentData} style={{paddingBottom: '7px'}}/>
        </>
    );
};

export default DepartmentCard;