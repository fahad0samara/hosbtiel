import { useLogIN } from '../../../ContextLog'

import Stats from './Stats'
import AvatarUploader from './AvatarUploader'
const DoctorProfile = () => {
 const {
  Doctor,

  dark,
 } = useLogIN()

 return (
  <>
   <div
    className=""
    style={{
     backgroundColor: dark ? '#000' : 'white',
     color: dark ? 'white' : 'black',
     boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)' : '0px 0px 10px 0px #ccc',
    }}
   >
    <div className="md:p-16 p-9 md:mx-6 ml-12 ">
     <div
      style={{
       backgroundColor: dark ? '#000' : 'white',
       color: dark ? 'white' : 'black',
       boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)' : '0px 0px 10px 0px rgb(103 232 249)',
      }}
      className="md:p-8 shadow md:mt-14 p-2 mt-24"
     >
      <div className={'grid grid-cols-1 md:grid-cols-2 my-6  '}>
       <div className="">
        <h1
         className="
                  text-xl font-bold  tracking-tight  -mt-5
                  "
        >
         Doctor Status :
        </h1>
        <Stats />
       </div>

       <div className="relative">
        {' '}
        <div className="   absolute inset-x-0   bottom-80 md:bottom-4 md:top-0  sm:-mt-32 flex items-center justify-center text-indigo-500">
         <AvatarUploader />
        </div>
       </div>
      </div>
      <div
       className=" border-t-4 border-cyan-400 mt-7  grid  grid-cols-1
                 
              xl:grid-cols-3  "
      >
       <div
        style={{
         boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
        }}
        className=" p-8 my-3 col-span-2 rounded-2xl  
                  shadow-lg  "
       >
        <div className="flex items-center space-x-2 font-bold  leading-8">
         <span className=" text-2xl mb-5 text-cyan-400 ">About</span>
        </div>
        <div className="">
         <div className="grid md:grid-cols-2 text-sm">
          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">First Name</div>
           <div className="px-4 py-2">{Doctor.name.firstName}</div>
          </div>
          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">Last Name</div>
           <div className="px-4 py-2">{Doctor.name.lastName}</div>
          </div>

          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">Gender</div>
           <div className="px-4 py-2">{Doctor.Gender}</div>
          </div>
          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">Contact No.</div>
           <div className="px-4 py-2">{Doctor.phoneNumber}</div>
          </div>

          <div className="flex items-center justify-between">
           <div className="px-4 py-2 font-bold">Email.</div>
           <div
            className="py-2 px-4 md:mr-11
                          mr-2
                      
                        "
           >
            {Doctor.user.email}
           </div>
          </div>
          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">Birthday</div>
           <div className="px-4 py-2">{Doctor.date.split('T')[0].split('-').reverse().join('-')}</div>
          </div>
         </div>
        </div>
       </div>
       <div
        style={{
         boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
        }}
        className=" mx-4  my-3  rounded-2xl  
                 p-4"
       >
        <div className="flex items-center space-x-2 font-bold  leading-8">
         <span className=" text-2xl mb-5 text-cyan-400 ">Hour and days</span>
        </div>
        {Doctor.availableDaysAndHours
         ? Doctor.availableDaysAndHours.map((item: any) => {
            return (
             <div
              className="
                          flex justify-between
                          items-center
                          mx-3
                          py-1
                          px-2
                         
                          text-md
                          
                          "
             >
              <span className=" hover: leading-6">{item.day}</span>
              <span className="  hover: leading-6">{item.startTime}</span>
              <span className="text-sm  text-cyan-300">TO</span>
              <span className="  hover:leading-6">{item.endTime}</span>
             </div>
            )
           })
         : 'No Days'}
        <ul className="   py-2 px-3 mt-3 divide-y rounded shadow-sm">
         <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
           <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
          </span>
         </li>
         <li className="flex items-center py-3">
          <span>Member since</span>
          <span className="ml-auto">{Doctor.user.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
         </li>
        </ul>
       </div>
      </div>
      <div
       className="  grid
                  grid-cols-1
                 
                  md:gap-5
               xl:grid-cols-3 mt-2 "
      >
       <div
        style={{
         boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
        }}
        className=" 
                  shadow-lg 
                  mx-2
                  md:mx-0
                    my-3  rounded-2xl  
                  p-8
                md:h-4/6
                  "
       >
        <h1
         className="text-2xl
                      text-center 

                    font-bold text-cyan-400 my-6"
        >
         Academic achievement
        </h1>
        <div className=" grid grid-cols-2 ">
         <div className="px-4 py-2 font-bold">degree</div>
         <div className="px-4 py-2">{Doctor.degree}</div>

         <div className="px-4 py-2 font-bold"> specialty</div>
         <div className="px-4 py-2">{Doctor.specialty}</div>
         <div className="px-4 py-2 font-bold"></div>

         <div className="px-4 py-2 font-bold">experience</div>
         <div className="px-4 py-2">{Doctor.experience}</div>
        </div>
       </div>
       <div
        style={{
         boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
        }}
        className=" 
                  shadow-lg 
                  mx-2
                  md:mx-0
                    my-3  rounded-2xl  
                  p-8
            xl:h-4/6
             h-auto
                  "
       >
        <h1
         className="text-2xl
                      text-center 

                    font-bold text-cyan-400 my-2"
        >
         HospitalAddress
        </h1>
        <div className=" grid grid-cols-2 ">
         <div className="px-1 py-2 font-bold">Country</div>
         <div className="px-1 py-1">{Doctor.HospitalAddress.Country}</div>

         <div className="px-1 py-2 font-bold"> city</div>
         <div className="px-1 py-2">{Doctor.HospitalAddress.city}</div>
         <div className="px-1 py-2 font-bold">state</div>
         <h4 className=" py-1 xl:text-base text-sm">{Doctor.HospitalAddress.state}</h4>

         <div className="px-1 py-2 font-bold">building</div>
         <div className="px-1 py-2">{Doctor.HospitalAddress.building}</div>
        </div>
       </div>
       <div
        style={{
         boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
        }}
        className=" md:p-8 my-3 col-span-1 rounded-2xl
                  mx-2
                    md:h-4/6
                  shadow-lg  "
       >
        <h1
         className=" text-2xl mb-5
                      text-center
                      md:text-left

                      font-bold
                  md:my-6
                     text-cyan-400 "
        >
         Medical History
        </h1>
        <div className="grid grid-rows-2">
         <div className="col-span-3 ">
          <div className="grid grid-cols-2">
           <div className="px-4 py-2 font-bold">Blood Group</div>
           <div className="px-4 py-2">{Doctor.bloodGroup}</div>
           <div className="px-4 py-2 font-bold">Height</div>
           <div className="px-4 py-2">
            {Doctor.height}
            <span className="font-semibold">cm</span>
           </div>
           <div className="px-4 py-2 font-bold">Weight</div>
           <div className="px-4 py-2">
            {Doctor.weight}
            <span className="font-semibold">kg</span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 )
}

export default DoctorProfile
