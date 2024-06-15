import { useLogIN } from '../../../../ContextLog'

const Growth = () => {
 const { dark } = useLogIN()
 return (
  <section
   style={{
    backgroundColor: `${dark ? '#000' : '#fff'}`,
    color: `${dark ? '#fff' : '#000'}`,
   }}
   className="relative overflow-hidden  "
  >
   <img
    className="absolute top-0 h-full w-full object-cover object-center opacity-30"
    src="/images/ZbQYxs58uj_TXVLLRtSaa.png"
    alt=""
   />

   <div className=" relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-12 backdrop-blur-md sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <h2 className="-mx-4 px-4 pt-4 pb-6 text-3xl text-blue-600 sm:text-4xl xl:text-5xl">
     Our <span className="font-bold">Growth</span>
    </h2>

    <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3">
     <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
      <p className="relative text-3xl font-black text-blue-600 sm:text-5xl">25M</p>
      <p className="relative mt-5 text-gray-600">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel
      </p>
     </div>

     <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
      <p className="relative text-3xl font-black text-blue-600 sm:text-5xl">51%</p>
      <p className="relative mt-5 text-gray-600">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel
      </p>
     </div>

     <div className="bg-white/10 relative mb-3 rounded-3xl border px-12 py-10 text-left shadow backdrop-blur-lg lg:px-12">
      <p className="relative text-3xl font-black text-blue-600 sm:text-5xl">8529+</p>
      <p className="relative mt-5 text-gray-600">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloremque vel
      </p>
     </div>
    </div>
   </div>
  </section>
 )
}

export default Growth
