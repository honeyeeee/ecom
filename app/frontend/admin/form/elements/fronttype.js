
export default function Types({types2 ,product,setproduct}){
    
    return (<div className="flex gap-4 flex-col">
        <label htmlFor="types" className="uppercase">product category</label>
        <select className=" types w-[200px] h-[50px] border-2 border-black rounded-2xl" onChange={(e)=>{
            setproduct((prev)=>({
                ...prev,
                productCategory:e.target.value
            }))
        }} >
         <option>product type</option>
         {types2.map(a=><option value={a._id} key={a._id} >{a.name}</option>)}
        </select>
    </div>)
}