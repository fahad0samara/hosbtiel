import axios from "axios";
import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useTable, usePagination} from "react-table";
import {patient} from "../../../types";
import FileSaver from "file-saver";
import {useLogIN} from "../../../../ContextLog";
const Table = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    Patient,

    dark,
    setdark,
  } = useLogIN();
  let {id} = useParams();
  const [Loading, setLoading] = React.useState<boolean>(true);
  const [prescriptions, setPrescriptions] = React.useState<any>([]);
  const [error, setError] = React.useState<boolean>(false);

  const [patient, setpatient] = React.useState<patient>();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/admin/patient/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setpatient(res.data);
        setLoading(false);

        // make the second API call to retrieve the prescriptions
        axios
          .get(`http://localhost:3000/admin/patient/${id}/prescriptions`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(res => {
            console.log(res.data);
            setPrescriptions(res.data);
            setLoading(false);
          })
          .catch(err => {
            setError(true);
            setLoading(false);
          });
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const downloadPrescription = async prescriptionId => {
    setLoading(true);
    console.log(prescriptionId);
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/patient/${id}/prescriptions/${prescriptionId}/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer",
        }
      );
      FileSaver.saveAs(
        new Blob([res.data], {type: "application/pdf"}),
        `Prescription ${prescriptionId}.pdf`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Doctor Name",
        accessor: "doctor",
      },
      {
        Header: "Date",

        accessor: "date",
        Cell: ({value}) => {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
        },
      },
      {
        Header: "Dosage",
        accessor: "dosage",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Instruction",
        accessor: "frequency",
      },
      {
        Header: "Medication",
        accessor: "medication",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Refills",
        accessor: "refills",
      },
      {
        Header: "Download",
        accessor: row => (
          <button
            onClick={() => {
              downloadPrescription(row._id);
            }}
          >
            Download
          </button>
        ),
      },
    ],
    []
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable(
      {
        //@ts-ignore
        columns,
        data: prescriptions,
      },
      usePagination
    );
  return (
    <div
      className="overflow-x-auto
      w-11/12
      mx-6
      
                 
                "
    >
      {
        //prescription
      }

      <h1
        className="
                  text-center
                
                  font-bold
                   text-2xl mb-5 text-cyan-400 "
      >
        Prescription History
      </h1>

      <table
        className="w-full text-center table-collapse
                  border border-cyan-300 rounded-lg shadow-lg
                 
                  "
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  style={{
                    backgroundColor: dark ? "#fff" : "#000",
                    color: dark ? "#000" : "#fff",
                  }}
                  className="px-1 py-1 font-medium  "
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  backgroundColor:
                    index % 3 === 0
                      ? ""
                      : index % 3 === 1
                      ? "#67e8f9"
                      : "purple",
                }}
              >
                {row.cells.map(cell => {
                  return (
                    <td className="px-4 py-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
