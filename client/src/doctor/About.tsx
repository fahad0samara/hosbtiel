import React from 'react'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
function About() {
  const {id} = useParams();
  const [doctor, setDoctor] = useState({});
  console.log("id", id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/doctor/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setDoctor(res.data);
      })

      .catch(err => {
        console.log(err);
      });
  }, [id]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      About
   </div>
  )
}

export default About