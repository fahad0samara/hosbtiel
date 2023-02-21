import { useLogIN } from "../../ContextLog";


const Table = () => {
  const { Profile, setProfile,
    Patient,
    setLoading, dark } =
    useLogIN();
  const convertDate = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${day}/${month}/${year}`;
  };
  return (
    <table
      className="xl:mx-10 mt-3 sm:ml-5 
      "
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
        boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
      }}
    >
      <thead
        className="thead-dark
    bg-cyan-300 
        "
      >
        <tr>
          <th></th>
          <th> Doctor</th>
          <th>Appointment date</th>
          <th> medicines</th>
          <th>Tests</th>
          <th>Prescription</th>
        </tr>
      </thead>
      {/* <tbody>
        {Patient
          ? Patient.prescriptions.map((mappedData: any) => {
              return (
                <tr>
                  <th>{mappedData ? mappedData._id : null}</th>
                  <td>{mappedData ? mappedData.doctor : null}</td>
                  <td>{mappedData ? convertDate(mappedData.date) : null}</td>
                  {mappedData?.medicines?.map((medicine: any) => {
                    return (
                      <td>
                        {medicine.name}

                        {medicine.type}

                        {medicine.frequency}
                      </td>
                    );
                  })}
                  <td>{mappedData ? mappedData.tests.name : null}</td>
                  <td className="">
                    {mappedData ? (
                      <a href={mappedData.prescription} download className="">
                        Download
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })
          : null}
      </tbody> */}
    </table>
  );
};

export default Table;
