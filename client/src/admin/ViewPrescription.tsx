import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Prescription {
    _id: string;
    medication: string;
    notes: string;
    date: string;
    dosage: string;
    // other prescription properties
}

const ViewPrescription: React.FC = () => {
    const { id, prescriptionId } = useParams();
    const [prescription, setPrescription] = useState<Prescription>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/admin/patient/${id}/prescription/${prescriptionId}`)
            .then(res => {
                setPrescription(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });
    }, [id, prescriptionId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;
    if (!prescription) return <p>Prescription not found</p>;

    return (
        <div>
            <h2>{prescription.medication}</h2>
            <p>{prescription.notes}</p>
            <p>{prescription.date}</p>
            <p>{prescription.dosage}</p>
        </div>
    );
};

export default ViewPrescription;