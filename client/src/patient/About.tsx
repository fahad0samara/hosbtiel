

const About = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

export default About

// {/* <div className="xl:ml-16 ml-12">
//   <div
//     style={{
//       backgroundColor: dark ? "#000" : "white",
//       color: dark ? "white" : "black",
//     }}
//     className=""
//   >
//     {
//       // name and profile
//     }
//     <div className=" grid sm:grid-cols-2 xl:mx-12 grid-cols-1  ">
//       <div className="flex flex-col justify-center p-4 mt-8 ">
//         <h1 className="xl:text-3xl md:text-2xl text-xl font-bold text-cyan-300  ">
//           <span
//             style={{
//               backgroundColor: dark ? "#000" : "white",
//               color: dark ? "white" : "black",
//             }}
//             className="xl:text-3xl md:text-2xl text-xl font-bold mx-2"
//           >
//             {message}
//           </span>

//           {Patient ? Patient.name.firstName : ""}
//         </h1>
//         <h4 className="text-sm font-bold mt-1 ml-3 text-zinc-400  ">
//           You'll be feeling healthy and strong again soon!
//         </h4>
//       </div>

//       <div className="flex items-center mt-8 xl:ml-36 md:ml-28 mx-16   drop-shadow-lg   ">
//         <div className="flex flex-col items-center mx-3">
//           <span className="text-xl mx-2 shadow-cyan-300 shadow-xl ">
//             <FcCalendar />
//           </span>
//           <span className="text-xl  font-semibold">{date}</span>
//         </div>
//         <div className="flex flex-col items-center mx-4">
//           <span className="text-xl mx-2 shadow-cyan-300 shadow-xl ">
//             <BiTime />
//           </span>
//           <span className="text-xl font-semibold">{time}</span>
//         </div>
//       </div>
//     </div>

//     <div
//       style={{
//         backgroundColor: dark ? "#000" : "white",
//         color: dark ? "white" : "black",
//       }}
//       className="grid xl:grid-cols-3 md:grid-cols-2 mt-10 grid-cols-1 gap-2  md:mx-10  "
//     >
//       {
//         //   Patient Details
//       }
//       <div
//         style={{
//           backgroundColor: dark ? "#000" : "white",
//           color: dark ? "white" : "black",
//           boxShadow: dark
//             ? "0px 0px 10px 0px rgb(103 232 249)"
//             : "0px 0px 10px 0px #ccc",
//         }}
//         className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-2 sm:my-0   md:w-80 "
//       >
//         <div className="flex flex-col justify-start">
//           <h1 className="text-xl font-bold text-cyan-300  ">Patient Details</h1>
//           <div className="flex flex-row justify-start mt-4 ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               Name:
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.name.firstName : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start mx-1  ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               middleName :
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.name.middleName : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start mx-1 ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               lastName :
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.name.LastName : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start  ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               Date of Birth :
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? convertDate(Patient.date) : ""}
//             </h1>
//           </div>
//           <div className="flex flex-col justify-start mt-4"></div>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: dark ? "#000" : "white",
//           color: dark ? "white" : "black",
//           boxShadow: dark
//             ? "0px 0px 10px 0px rgb(103 232 249)"
//             : "0px 0px 10px 0px #ccc",
//         }}
//         className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-4 sm:my-0   md:w-80 "
//       >
//         <div className="flex flex-col justify-start">
//           <div className="flex flex-row justify-start mt-4 ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               healthIDNumber
//             </h1>
//             <h1
//               className="
//                    font-extrabold text-cyan-400  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.healthIDNumber : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start mx-1 my-1  ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               mobile :
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.mobile : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start mx-1 ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               email :
//             </h1>
//             {/* <h1
//                   className="
//                    font-extrabold  italic  ml-1
//                  "
//                 >
//                   {Profile ? Profile.user.email : ""}
//                 </h1> */}
//           </div>

//           <div className="flex flex-row justify-start my-1  ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               bloodGroup
//             </h1>
//             <h1
//               className="
//                    font-extrabold  italic  ml-1
//                  "
//             >
//               {Patient ? Patient.bloodGroup : ""}
//             </h1>
//           </div>
//           <div className="flex flex-col justify-start mt-4"></div>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: dark ? "#000" : "white",
//           color: dark ? "white" : "black",
//           boxShadow: dark
//             ? "0px 0px 10px 0px rgb(103 232 249)"
//             : "0px 0px 10px 0px #ccc",
//         }}
//         className="p-5 rounded-2xl ml-7 w-72 md:ml-4 my-2 sm:my-0   md:w-80 "
//       >
//         <h1 className="text-xl font-bold text-cyan-300  ">
//           Emergency contact person
//         </h1>
//         <div className="flex flex-col justify-start mt-4 ">
//           {
//             //firstName and LastName
//           }
//           <div className="flex flex-row justify-start ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               Name:
//             </h1>
//             <h1
//               className="
//                     font-extrabold italic ml-1"
//             >
//               {Patient ? Patient.contactPerson.name.firstName : ""}
//             </h1>
//             <h1
//               className="
//                     font-extrabold italic ml-1"
//             >
//               {Patient ? Patient.contactPerson.name.LastName : ""}
//             </h1>
//           </div>

//           <div className="flex flex-row justify-start mx-1 my-1  ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               mobile :
//             </h1>
//             <h1
//               className="
//                     font-extrabold  italic  ml-1
//                   "
//             >
//               {Patient ? Patient.contactPerson.mobile : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start mx-1 ">
//             <h1 className="text-md font-bold text-zinc-400 italic   ">
//               email :
//             </h1>
//             <h1
//               className="
//                     font-extrabold  italic  ml-1
//                   "
//             >
//               {Patient ? Patient.contactPerson.email : ""}
//             </h1>
//           </div>
//           <div className="flex flex-row justify-start my-1  ">
//             <h1 className="text-md font-bold text-zinc-400 italic mx-1  ">
//               relationship
//             </h1>
//             <h1
//               className="
//                     font-extrabold  italic  ml-1
//                   "
//             >
//               {Patient ? Patient.contactPerson.relation : ""}
//             </h1>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="grid grid-cols-1 gap-4 mt-8 xl:ml-20 md:grid-cols-2   xl:grid-cols-3 mx-8">
//       <div
//         style={{
//           boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
//         }}
//         className=" w-64 p-1 ml-2 mx-14 space-x-4 rounded-lg md:space-x-6 bg-cyan-300 "
//       >
//         <div className=" ">
//           <h1
//             className="
//                     text-2xl font-bold italic ml-2 text-black
//                   "
//           >
//             permanent illness :
//           </h1>
//         </div>
//         {
//           //diseaseList
//         }
//         <div className="mt-3">
//           <p className="text-black text-xl">
//             {Patient &&
//             Patient.diseaseList &&
//             Patient.diseaseList.length > 0 ? (
//               Patient.diseaseList[0].disease
//             ) : (
//               <div>
//                 <h1>There are no diseases</h1>
//               </div>
//             )}
//           </p>
//           <p className="capitalize">
//             {Patient && Patient.diseaseList && Patient.diseaseList.length > 0
//               ? Patient.diseaseList[0].description
//               : ""}
//           </p>
//         </div>
//       </div>
//       <div
//         style={{
//           boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
//         }}
//         className=" w-64 p-1 ml-2 mx-14 space-x-4 rounded-lg md:space-x-6 bg-cyan-300 "
//       >
//         <div className=" ">
//           <h1
//             className="
//                     text-2xl font-bold italic ml-2 text-black
//                   "
//           >
//             allergyList
//           </h1>
//         </div>
//         {
//           //diseaseList
//         }
//         <div className="mt-3">
//           <p className="text-black text-xl">
//             {Patient &&
//             Patient.diseaseList &&
//             Patient.diseaseList.length > 0 ? (
//               Patient.diseaseList[0].disease
//             ) : (
//               <div>
//                 <h1>There are no diseases</h1>
//               </div>
//             )}
//           </p>
//           <p className="capitalize">
//             {Patient && Patient.diseaseList && Patient.diseaseList.length > 0
//               ? Patient.diseaseList[0].description
//               : ""}
//           </p>
//         </div>
//       </div>
//       <div
//         style={{
//           boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
//         }}
//         className=" w-64 p-1 ml-2 mx-14 space-x-4 rounded-lg md:space-x-6 bg-cyan-300 "
//       >
//         <div className=" ">
//           <h1
//             className="
//                     text-2xl font-bold italic ml-2 text-black
//                   "
//           >
//             medicationList
//           </h1>
//         </div>
//         {
//           //diseaseList
//         }
//         <div className="mt-3">
//           <p className="text-black text-xl">
//             {Patient &&
//             Patient.medicationList &&
//             Patient.medicationList.length > 0 ? (
//               Patient.medicationList[0].medication
//             ) : (
//               <div>
//                 <h1>There are no medications</h1>
//               </div>
//             )}
//           </p>
//           <p className="capitalize">
//             {Patient &&
//             Patient.medicationList &&
//             Patient.medicationList.length > 0
//               ? Patient.medicationList[0].description
//               : ""}
//           </p>
//         </div>
//       </div>
//     </div>

//     <div
//       style={{
//         backgroundColor: dark ? "#000" : "white",
//         color: dark ? "white" : "black",
//       }}
//     >
//       <h1 className="text-2xl  font-bold italic  ml-20 mt-7">
//         medical history
//       </h1>
//       <Table />
//     </div>
//     <div></div>
//   </div>
// </div>; */}
