export default function Sale(){
    return(
        <section className="  h-screen w-full ">

<div className=" relative border-2 border-black w-full h-full bg-bottom bg-cover bg-no-repeat" 
style={{backgroundImage:"url('/catagory/image.png')"}}
>

    <div className="absolute left-20 top-1/2 -translate-y-1/2 ">
    <div className="flex gap-6 items-center mb-[4rem]">
      <div className="w-[100px] h-0 border-2 border-body "></div>
      <h1 className="uppercase  text-body  text-xl font-extralight tracking-[0.4rem] ">New Season</h1>
    </div>
    <div className="flex flex-col gap-6" >
<span className="text-8xl text-body font-cantata">UP TO</span>
    <h1  className="text-8xl text-body font-cantata"> <span className="text-9xl italic text-[#FAD488] ">40% </span>OFF</h1>
    </div>
    
    <p className="text-xl text-body tracking-[0.4rem] uppercase mt-8 font-extralight ">Discover our latest collection</p>
    <button className=" mt-[6rem] cursor-pointer bg-body text-2xl text-text  px-[4rem] py-4 font-light">SHOP NOW</button>
  </div>

   <Image
    src="/catagory/saleModel.png"
    alt="Sale"
    width={450}
    height={400}
    className="absolute right-[200px] bottom-[20px] "
  />

</div>

</section>
    )
}