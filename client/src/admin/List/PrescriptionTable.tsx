import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useTable} from "react-table";

function PrescriptionTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/patient/${id}/prescriptions`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const columns = [
    {
      Header: "Medication",
      accessor: "medication",
    },
    {
      Header: "Dosage",
      accessor: "dosage",
    },
    {
      Header: "Frequency",
      accessor: "frequency",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Notes",
      accessor: "notes",
    },
    {
      Header: "Refills",
      accessor: "refills",
    },
  ];

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data,
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PrescriptionTable;
