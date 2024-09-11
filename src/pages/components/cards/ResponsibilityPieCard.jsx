import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResponsibilityPieCard = () => {
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
    const responsibilities = employees.reduce((acc, emp) => {
        acc[emp.responsibility] = (acc[emp.responsibility] || 0) + 1;
        return acc;
    }, {});

    const employeeResponsibilityData = {
        labels: Object.keys(responsibilities),
        datasets: [
            {
                data: Object.values(responsibilities),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };
    return (
        <>
        <Pie data={employeeResponsibilityData} />
        </>
    );
};

export default ResponsibilityPieCard;