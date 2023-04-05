import { useLogIN } from '../../../ContextLog'
import LeftSide from './LeftPage/LeftSide'
import RightSide from './middleAndRight/RightSide'

const Dashboard = (props: any) => {
 const { dark } = useLogIN()
 return (
  <div
   style={{
    backgroundColor: dark ? '#000' : 'white',
    color: dark ? 'white' : 'black',
   }}
   className="grid lg:grid-cols-4
    h-screen
    w-screen
    md:grid-cols-3
    "
  >
   <div
    style={{
     backgroundColor: dark ? '#000' : '#dbe6e7',
     boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)' : '0px 0px 10px 0px #ccc',
    }}
    className="col-span-1   p-2  hidden md:block border-r-2 border-cyan-300   bg-[#dbe6e7]
   "
   >
    <LeftSide />
   </div>
   <div className=" lg:col-span-3  sm:col-span-2 ml-12 sm:ml-6 ">
    <RightSide />
   </div>
  </div>
 )
}

export default Dashboard
