import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UsersCard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.log("error fetching users", error.message);
            }
        };
        fetchUsers();
    }, []);

    const roles = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {});

    const userRolesData = {
        labels: Object.keys(roles),
        datasets: [
            {
                data: Object.values(roles),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };
    return (
        <>
         <Pie data={userRolesData} />
        </>
    );
};
export default UsersCard;