"use client";

import Link from "next/link";
import Comp from "../../admin/componente/comp";
import { useState } from "react";

export default function Buttons({ id }) {
      const [selectedId, setSelectedId] = useState(null);
  const [sure, setSure] = useState(false);
  return (
    <div className="flex gap-2 pt-2 border-t border-border mt-auto">

      <Link
        href={`/frontend/editProduct/${id}`}
        className="flex-1 ..."
      >
        Edit
      </Link>

      <button
        onClick={() => {
          console.log(id);
          setSelectedId(id)
          setSure(true)
        }}
        className="flex-1 ..."
      >
        Delete
      </button>
      <Comp
  sure={sure}
  setsure={setSure}
  id={id}
/>

    </div>
  );
}