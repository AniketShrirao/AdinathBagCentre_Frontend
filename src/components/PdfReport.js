// src/components/PdfReport.js
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBags, selectAllBags } from '../app/features/bags/bagsSlice';
import { toast } from 'react-toastify';

const PdfReport = () => {
    const dispatch = useDispatch();
    const bags = useSelector(selectAllBags);

    useEffect(() => {
        dispatch(fetchBags()); // Fetch bags when component mounts
    }, [dispatch]);

    const generatePdf = () => {
        if (bags.length === 0) {
            toast('No data available to generate the report.');
            return;
        }

        try {
            const doc = new jsPDF();

            // Calculate total price and total number of bags repaired
            const totalBags = bags.length;
            const totalPrice = bags.reduce((total, bag) => total + (parseFloat(bag.price) || 0), 0);

            // Get current date and time in Indian time zone
            const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const currentDateTime = new Date().toLocaleString('en-IN', options);

            // Add header with total details
            doc.text('Monthly Report - Repaired Bags', 14, 20);
            doc.text(`Total Bags Repaired: ${totalBags}`, 14, 30);
            doc.text(`Total Price: ${totalPrice} Rupees`, 14, 40); // Use rupee symbol directly here
            doc.text(`Date: ${currentDateTime}`, 14, 50);

            // Add table with bag details
            const tableColumn = ["Customer Name", "Customer Number", "Bag Received", "Bag Repaired", "Price", "Description"];
            const tableRows = [];

            bags.forEach(bag => {
                const bagReceivedDate = new Date(bag.bagReceivedDate).toLocaleString('en-IN', options);
                const bagRepairedDate = bag.bagRepairedDate ? new Date(bag.bagRepairedDate).toLocaleString('en-IN', options) : 'Not Repaired Yet';
                const bagData = [
                    bag.customerName,
                    bag.customerPhone,
                    bagReceivedDate,
                    bagRepairedDate,
                    `${parseInt(bag.price)}`, // Use rupee symbol directly here
                    bag.description
                ];
                tableRows.push(bagData);
            });

            doc.autoTable({
                startY: 60,
                head: [tableColumn],
                body: tableRows,
                theme: 'grid',
            });

            doc.save('monthly_report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast('There was an error generating the PDF. Please try again.');
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Generate Monthly Report
            </Typography>
            <Button variant="contained" color="primary" onClick={generatePdf}>
                Download PDF
            </Button>
        </div>
    );
};

export default PdfReport;
