import { ArrowRightCircle} from "lucide-react"

export default  function Category(){
    return (
        <>
           <section className="min-h-screen bg-[#F1E5D3]">

  {/* Heading */}
  <div className="pt-[1rem] px-20 flex flex-col gap-3 justify-center items-center">

    <div className="flex gap-8 items-center mb-1">

      <div className="w-[100px] border border-black h-0"></div>

      <h1 className="uppercase tracking-[0.15rem] text-sm">
        Men's Collection
      </h1>

      <div className="w-[100px] border border-black h-0"></div>

    </div>

    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl text-text font-cantata font-bold capitalize">
        explore men's collection
      </h1>
    </div>

    <p className="mt-1 text-text/70 text-base w-[45%] leading-relaxed text-center">
      Discover timeless styles crafted for every occasion, from everyday
      essentials to refined statement pieces.
    </p>

  </div>


  {/* Sub Categories */}
  <nav className="pt-[2.2rem] px-20">

    <ul className="grid grid-cols-4 grid-rows-2  gap-8">

      {/* T-Shirts */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                T-Shirts
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>


      {/* Shirts */}
      <li className="relative w-full h-[200px]w-[20%] h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Shirts
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>


      {/* Trousers */}
      <li className="relative w-full h-[200px]overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Trousers
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>


      {/* Jackets */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Jackets
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>


      {/* Jackets */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Cargo
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>
      {/* Jackets */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Swaters
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>
      {/* Jackets */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Accessorie's
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>
      {/* Jackets */}
      <li className="relative w-full h-[200px] overflow-hidden group bg-[#B8A991]">

        <div className="absolute inset-0 flex items-end p-6 bg-black/10">

          <div className="flex justify-between items-end w-full">

            <div>
              <span className="text-2xl font-cantata text-white">
                Blazer's
              </span>

              <h1 className="uppercase tracking-[0.2rem] text-sm text-body">
                explore more
              </h1>
            </div>

            <ArrowRightCircle
              className="text-body w-11 h-11"
              strokeWidth={1}
            />

          </div>

        </div>

      </li>

    </ul>

  </nav>

</section>

<section>

<div>
    
</div>

</section>
        </>

    )
}