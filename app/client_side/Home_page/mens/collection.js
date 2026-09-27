export default  function Collection (){
    return(
          <section className="h-screen w-full   flex flex-col  bg-body ">
        {/* heading */}
        <div className="w-full h-[20%]   flex justify-center  " >

        <div className="w-[70%] h-full  rounded-2xl bg-bg  gap-4 flex  flex-col items-center justify-center ">

        <h1 className="text-4xl font-cantata uppercase text-body text-center  ">  best <span className="text-head"> collection </span> </h1>
        <p className="text-body capitalize tracking-[0.2rem] text-sm     font-extralight ">Discover our finest picks, thoughtfully selected for your wardrobe.</p>
        
        </div>
        </div>

        {/* cards */}

        <div className="w-full h-[80%] flex flex-col justify-center items-center  ">
            <ul className="w-[90%] h-[80%] border-2 border-body" > 
                <li  className="  w-[24%] h-full rounded-2xl border-2  bg-[#e7d8c2]"  > 
                    
                </li>
            </ul>
        </div>

      </section>

    )
} 