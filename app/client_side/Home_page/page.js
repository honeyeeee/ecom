import { Search, ArrowRightCircle, UserCircle2, ShoppingBag ,Truck , Shield , CircleHelpIcon, MessageCircle ,Gem , Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      


      {/* hero section  */}
<main className=" w-full min-h-screen">
  <header className="px-8 py-5 bg-body">
        <nav className="flex items-center justify-between">

          {/* Brand */}
          <a href="/" className="text-2xl font-semibold tracking-wide">
            Virelle
          </a>

          {/* Navigation */}
          <ul className="flex items-center gap-10 text-sm">
            <li>
              <a href="/" className="hover:opacity-60 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/collection" className="hover:opacity-60 transition">
                Collection
              </a>
            </li>

            <li>
              <a href="/new-arrivals" className="hover:opacity-60 transition">
                New Arrivals
              </a>
            </li>

            <li>
              <a href="/deals" className="hover:opacity-60 transition">
                Deals
              </a>
            </li>

            <li>
              <a href="/about" className="hover:opacity-60 transition">
                About
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hover:opacity-60 transition"
            >
              <Search size={21} strokeWidth={1.7} />
            </button>

            <a
              href="/account"
              aria-label="Account"
              className="hover:opacity-60 transition"
            >
              <UserCircle2 size={21} strokeWidth={1.7} />
            </a>

            <a
              href="/cart"
              aria-label="Shopping bag"
              className="hover:opacity-60 transition"
            >
              <ShoppingBag size={21} strokeWidth={1.7} />
            </a>
          </div>

        </nav>
      </header>


      
    <section className=" relative w-full min-h-[calc(100vh-80px)] ">
<Image
  src="/heroSection/image.png"
  alt=""
  fill
  priority
  className="object-cover object-top "
/>

{/* <Image
src='/modelimage.png'
width={400}
height={900}
alt="model"
 className="absolute right-80 bottom-0 z-10"
/> */}


 <div className="absolute left-30 top-15 z-20 flex flex-col">
  <div className="flex gap-6 items-center mb-8">

{/* subheading */}
      <p className=" ml-[8rem]  text-sm tracking-[0.2em] text-text uppercase ">
        more then fashion
      </p>
      <div className="w-[200px] border-t border-black h-0 "></div>
  </div>

  {/* main heading */}
<div className="ml-[8rem] mt-8 flex flex-col gap-4">
 <h1 className="text-6xl font-cantata  uppercase ">
        Define Your</h1>
        
       <h1  className="text-6xl   font-cantata  uppercase "> Own Style.
      </h1>

      <p className="mt-6 max-w-md text-lg text-text  ">
       Timeless pieces crafted for effortless everyday elegance, designed to move with your life.
      </p>

</div>
     
      <button className=" ml-[8rem] mt-16 px-7 py-3 rounded-full text-body w-fit bg-[#2B211B] hover:bg-[#3A2D24] duration-150   ">
        Shop Collection →
      </button>
    </div>



    <div className="absolute bottom-10 left-20 ml-[10.8rem]  " >
        <ul className=" flex gap-8" >
            <li><div  className="flex flex-col items-center gap-4 "><Gem size={30} strokeWidth={1} />
            <span className="uppercase ">Fast delivery</span> </div></li>

            <div className="h-[70px] border-l border-black"></div>


            <li><div  className="flex flex-col items-center gap-4"><Leaf size={30} strokeWidth={1} />
            <span className="uppercase ">Fast delivery</span> </div></li>

              <div className="h-[70px] border-l border-black"></div>
            <li><div  className="flex flex-col items-center gap-4 "><Truck size={25} strokeWidth={1} />
            <span className="uppercase ">Fast delivery</span> </div></li>
           
        </ul>
    </div> 
    </section>




      <section className=" min-h-screen bg-[#F1E5D3]">

  {/* Heading */}
  <div className="pt-[6rem] px-20 flex flex-col gap-3 justify-center items-center h-[200px] ">
    
    <div className="flex  gap-8 items-center mb-4">
      <div className="w-[100px] border-1  border-black h-0 "></div>
      <h1 className="uppercase">shop By Category</h1>
      <div className="w-[100px] border-1 border-black h-0 "></div>
    </div>
    <div className="flex flex-col justify-center items-center w-[45%] ">
 <h1 className="text-4xl text-text font-cantata font-bold capitalize">
      for you and your & 
     
    </h1>
    <h1 className="text-4xl text-text  text-center font-cantata font-bold capitalize">
 your loved ones
    </h1>
    </div>

    <p className="mt-2  text-text/70 text-base w-[45%] leading-relaxed text-center">
      Thoughtfully curated styles for every moment, every mood, and everyone you love.
    </p>
   
  </div>


  {/* Category */}
  <nav className=" h-[400px] pt-[4rem]  ">

    <ul className="flex justify-between px-20 mt-10 ">

      {/* Women */}
     <li className="relative w-[22%] h-[300px]  overflow-hidden group">
  <Image 
    src="/cat/women.png" 
    alt="Accessories"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300" // object-contain bhi try kar sakte hain
  />
  
  <Link
    href="/c"
    className="absolute inset-0 w-full h-full flex items-end p-6 z-10 bg-black/10" // halka dark overlay text read karne ke liye
  >

<div className="flex justify-between w-full">

    <div> 
  <span className="text-2xl font-cantata text-white">
      Women
    </span>
    <h1 className="uppercase tracking-[0.2rem] text-sm text-body ">explore more</h1>
    </div>
    <div>
      
  <ArrowRightCircle className="text-body w-12 h-12 " 
    strokeWidth={1}/>
    </div>
    </div>
  
    
  </Link>
</li>


      {/* Men */}
    <li className="relative w-[22%] h-[300px]  overflow-hidden group">
  <Image 
    src="/cat/image.png" 
    alt="Accessories"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300" // object-contain bhi try kar sakte hain
  />
  
  <Link
    href="/c"
    className="absolute inset-0 w-full h-full flex items-end p-6 z-10 bg-black/10" // halka dark overlay text read karne ke liye
  >
    <div className="flex justify-between w-full">

    <div> 
  <span className="text-2xl font-cantata text-white">
      Men
    </span>
    <h1 className="uppercase tracking-[0.2rem] text-sm text-body ">explore more</h1>
    </div>
    <div>
      
  <ArrowRightCircle className="text-body w-12 h-12 " 
    strokeWidth={1}/>
    </div>
    </div>
  </Link>
</li>


      {/* Accessories */}
     <li className="relative w-[22%] h-[300px]  overflow-hidden group">
  <Image 
    src="/cat/accessoory.png" 
    alt="Accessories"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300" // object-contain bhi try kar sakte hain
  />
  
  <Link
    href="/c"
    className="absolute inset-0 w-full h-full flex items-end p-6 z-10 bg-black/10" // halka dark overlay text read karne ke liye
  >
    <div className="flex justify-between w-full">

    <div> 
  <span className="text-2xl font-cantata text-white">
      Accessories
    </span>
    <h1 className="uppercase tracking-[0.2rem] text-sm text-body ">explore more</h1>
    </div>
    <div>
      
  <ArrowRightCircle className="text-body w-12 h-12 " 
    strokeWidth={1}/>
    </div>
    </div>
  </Link>
</li>

      {/* Kids */}
    <li className="relative w-[22%] h-[300px]  overflow-hidden group">
  <Image 
    src="/cat/child2.png" 
    alt="Accessories"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300" // object-contain bhi try kar sakte hain
  />
  
  <Link
    href="/c"
    className="absolute inset-0 w-full h-full flex items-end p-6 z-10 bg-black/10" // halka dark overlay text read karne ke liye
  >
    <div className="flex justify-between w-full">

    <div> 
  <span className="text-2xl font-cantata text-white">
      Kids
    </span>
    <h1 className="uppercase tracking-[0.2rem] text-sm text-body ">explore more</h1>
    </div>
    <div>
      
  <ArrowRightCircle className="text-body w-12 h-12 " 
    strokeWidth={1}/>
    </div>
    </div>
  </Link>
</li>
    </ul>

  </nav>

</section>





{/* New arrival */}
 
   <section className=" h-screen overflow-hidden bg-body">
<div className=" h-full w-full  flex flex-col gap-8"
style={{backgroundImage:"url('/arrival/image.png')"}}
>
  {/* parent text div */}
  <div className="w-full min-h-[20%] pt-[4rem] pb-8  ">

<div className="flex flex-col gap-6 items-center justify-center ">

{/* sub heading div */}
    <div className=" flex gap-4 items-center  "> 
<div className="w-[100px] h-0 border-1 border-black  "></div>
<div className="font-extralight tracking-[0.2rem] text-xl uppercase ">Shop trendy styles metters daily life</div>
<div className="w-[100px] h-0 border-1 border-black "></div>
    </div>

{/* heading div */}

<div className="w-full  flex flex-col justify-center items-center gap-4">
  <div className="uppercase text-5xl tracking-[0.2rem]  font-cantata font-bold text-center">
    New <span className=" text-head">Arrivals</span> 
  </div>
  <div className="w-full border- flex items-center justify-center">

  <p className="text-center w-[40%]  font-light text-sm uppercase tracking-[0.3rem] "> live bright with trendy products that caterd daliy need at minimum price live life long</p>

  </div>

</div>
  </div>
</div>


{/* banner section */}

<div className="h-full w-full overflow-hidden  grid grid-cols-4 gap-4 items-center justify-items-center ">
  {/* product 1 */}
  <div className=" relative h-[80%] w-[80%]  ">
<Image
src="/arrival/cat/men.png"
fill
alt="men image"
className=" object-center object-cover transition-transform duration-500 hover:scale-105 "
/>

  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent" />

{/* text section */}
<div className="absolute flex  flex-col ">

<div className="  mt-6 ml-4   flex flex-col gap-4 ">
<h1 className="text-3xl font-cantata  capitalize font-extrabold "> everyday <br/> <span className="font-light">Shirts</span></h1>

<p className="w-[60%]  capitalize text-[1rem] text-sm">upgrade your everyday style</p>

<div className="font-light border-[0.02rem] border-black w-[20%] h-0">

</div>
</div>


{/* bottom text */}
<div className="flex flex-col gap-4 mt-[4.4rem] ml-4">
  
  <h1 className="uppercase text-sm  text-body font-cantata flex flex-col gap-1">
    Up to <br/>
    <span className="text-xl">40% off</span> 
  </h1>
  <button className=" uppercase text-sm text-body border-2 border-body w-fit h-fit px-4 py-1">shop now</button>
</div>
  </div>
</div>




  {/* product2 */}
  <div className=" relative h-[80%] w-[80%]  ">
 <Image
src="/arrival/cat/women.png"
fill
alt="men image"
className=" object-center object-cover"
/>

 <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent" />

{/* text section */}
<div className="absolute flex  flex-col ">

<div className="  mt-6 ml-4   flex flex-col gap-4 ">
<h1 className="text-3xl font-cantata  capitalize font-extrabold "> Floral <br/> <span className="font-light">Muse </span></h1>

<p className="w-[60%]  capitalize text-[1rem] text-sm">Soft silhouettes, bold presence</p>

<div className="font-light border-[0.02rem] border-black w-[20%] h-0">

</div>
</div>


{/* bottom text */}
<div className="flex flex-col gap-4 mt-[4.4rem] ml-4">
  
  <h1 className="uppercase text-sm  text-body font-cantata flex flex-col gap-1">
    Up to <br/>
    <span className="text-xl">50% off</span> 
  </h1>
  <button className=" uppercase text-sm text-body border-2 border-body w-fit h-fit px-4 py-1">shop now</button>
</div>
  </div>


  </div>
  {/* product 3 */}
  <div className=" relative h-[80%] w-[80%] ">
 <Image
src="/arrival/cat/accessory.png"
fill
alt="men image"
className=" object-center object-cover"
/>

 <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent" />

{/* text section */}
<div className="absolute flex  flex-col ">

<div className="  mt-6 ml-4   flex flex-col gap-4 ">
<h1 className="text-3xl font-cantata  capitalize font-extrabold "> Quiet  <br/> <span className="font-light">Luxury</span></h1>

<p className="w-[60%]  capitalize text-[1rem] text-sm">Details that define your look</p>

<div className="font-light border-[0.02rem] border-black w-[20%] h-0">

</div>
</div>


{/* bottom text */}
<div className="flex flex-col gap-4 mt-[4.4rem] ml-4">
  
  <h1 className="uppercase text-sm  text-body font-cantata flex flex-col gap-1">
    Up to <br/>
    <span className="text-xl">60% off</span> 
  </h1>
  <button className=" uppercase text-sm text-body border-2 border-body w-fit h-fit px-4 py-1">shop now</button>
</div>
  </div>

  </div>

  {/* product 4 */}
  <div className=" relative h-[80%] w-[80%] ">
 <Image
src="/arrival/cat/shoes.png"
fill
alt="men image"
className=" object-center object-cover"
/>

 <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 to-transparent" />

{/* text section */}
<div className="absolute flex  flex-col ">

<div className="  mt-6 ml-4   flex flex-col gap-4 ">
<h1 className="text-3xl font-cantata  capitalize font-extrabold "> classic <br/> <span className="font-light">formals</span></h1>

<p className="w-[60%]  capitalize text-[1rem] text-sm">Step into timeless style</p>

<div className="font-light border-[0.02rem] border-black w-[20%] h-0">

</div>
</div>


{/* bottom text */}
<div className="flex flex-col gap-4 mt-[4.4rem] ml-4">
  
  <h1 className="uppercase text-sm  text-body font-cantata flex flex-col gap-1">
    Up to <br/>
    <span className="text-xl">30% off</span> 
  </h1>
  <button className=" uppercase text-sm text-body border-2 border-body w-fit h-fit px-4 py-1">shop now</button>
</div>
  </div>

  </div>

  

</div>


</div>
 
</section>






{/* sale section */}




 
  <section className="bg-[#F1E5D3] py-15">

  {/* Heading */}
  <div className="max-w-[1400px] mx-auto px-10 mb-14">

    <div className="flex  items-center justify-center gap-4 mb-6">
      <div className="w-[200px] border-t border-black" />

      <p className="uppercase tracking-[0.25em] text-xl font-extralight">
        Curated for you
      </p>
      <div className="w-[200px] border-t border-black" />
    </div>

  

      <div className="flex flex-col justify-center items-center">
        <h2 className="uppercase font-cantata text-5xl  text-head tracking-[0.12em]">
          Trending <span className=" text-black font-light">Now</span>
        </h2>

        <p className="mt-4 text-sm tracking-[0.18em] uppercase font-light">
          Styles making an impression this season.
        </p>
      </div>

      


  </div>


  {/* Products */}
  <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-4 gap-6">

    {/* Card */}
    <div className="group">

      <div className="relative h-[430px] overflow-hidden bg-[#e7d8c2]">

        <img
          src="/products/product1.png"
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
          Trending
        </span>

        <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Add to bag
        </button>

      </div>

      <div className="pt-5 flex justify-between">

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            Men
          </p>

          <h3 className="mt-2 font-cantata text-lg">
            Relaxed Overshirt
          </h3>
        </div>

        <p className="text-sm">
          ₹1,499
        </p>

      </div>

    </div>


    {/* Card 2 */}
    <div className="group">

      <div className="relative h-[430px] overflow-hidden bg-[#e7d8c2]">

        <img
          src="/products/product2.png"
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
          Bestseller
        </span>

        <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Add to bag
        </button>

      </div>

      <div className="pt-5 flex justify-between">

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            Women
          </p>

          <h3 className="mt-2 font-cantata text-lg">
            Soft Knit Top
          </h3>
        </div>

        <p className="text-sm">
          ₹1,299
        </p>

      </div>

    </div>


    {/* Card 3 */}
    <div className="group">

      <div className="relative h-[430px] overflow-hidden bg-[#e7d8c2]">

        <img
          src="/products/product3.png"
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
          New
        </span>

        <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Add to bag
        </button>

      </div>

      <div className="pt-5 flex justify-between">

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            Accessories
          </p>

          <h3 className="mt-2 font-cantata text-lg">
            Minimal Watch
          </h3>
        </div>

        <p className="text-sm">
          ₹2,499
        </p>

      </div>

    </div>


    {/* Card 4 */}
    <div className="group">

      <div className="relative h-[430px] overflow-hidden bg-[#e7d8c2]">

        <img
          src="/products/product4.png"
          alt="Product"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
          Popular
        </span>

        <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Add to bag
        </button>

      </div>

      <div className="pt-5 flex justify-between">

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            Footwear
          </p>

          <h3 className="mt-2 font-cantata text-lg">
            Classic Sneakers
          </h3>
        </div>

        <p className="text-sm">
          ₹1,899
        </p>

      </div>

    </div>

  </div>

</section>


<section>
    
</section>

</main>

    </>
  );
}