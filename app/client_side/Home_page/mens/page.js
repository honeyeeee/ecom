import { ArrowRightCircle} from "lucide-react"
import Category from "./category"
import Collection from "./collection"
import Occasion from "./occassion"
export default function Men(){
    return(
        <>
      <Category/>
     <Collection/>
      <Occasion/>

      <section className="w-full h-screen border-2 border-black  flex flex-col justify-center  bg-body">

<div className="w-full h-[90%] border-2 border-black items-center bg-bg">
{/* <h1 className="uppercase text-5xl"> Be fashion Ready</h1> */}
<div className="w-full h-[10%] border-2 border-body">

<h1 className="text-[#F8F5F2] text-5xl ">Keep elegent</h1>
</div>
</div>

      </section>

     
  </>



    )
}