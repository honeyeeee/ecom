export default function Occasion(){
    return(
         <section className="h-screen w-full   flex flex-col  bg-body">  

         <div className="w-full h-[20%]   flex justify-center  " >

        <div className="w-[70%] h-full  rounded-2xl bg-bg  gap-4 flex  flex-col items-center justify-center ">

        <h1 className="text-4xl font-cantata uppercase text-body text-center  ">  Shop By  <span className="text-head"> occasion </span> </h1>
        <p className="text-body capitalize tracking-[0.2rem] text-sm     font-extralight ">From everyday essentials to special occasions, find the right style for every moment.</p>
        
        </div>
        </div>

        {/* cards */}

        <div className="w-full h-[80%] flex flex-col justify-center items-center  ">
            <ul className="w-[90%] h-[80%] border-2 grid grid-cols-4 grid-rows-2 gap-4 border-body" > 
                <li  className="  w-full h-full rounded-2xl border-2 row-span-2  bg-[#e7d8c2]"  > 
                </li>
                <li className="w-full h-full rounded-2xl border-2 ">

                </li>
                <li className="w-full h-full rounded-2xl border-2 ">

                </li>
                <li className="w-full h-full rounded-2xl border-2  row-span-2">

                </li>
                <li className="w-full h-full rounded-2xl border-2 ">

                </li>
                <li className="w-full h-full rounded-2xl border-2 ">

                </li>
            </ul>
        </div>
    </section>
    )
}