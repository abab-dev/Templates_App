import React from "react";
export default function ElementLayoutCard({ layout }) {
  return (
    <div>

      <div className="flex flex-col items-center justify-center border border-dashed rounded-xl p-3
             group hover:shadow-sm hover:border-primary cursor-pointer
             ">

        {<layout.icon className="group-hover:bg-purple-100 group-hover:text-primary rounded-full"></layout.icon>}
        <h2 className="text-sm group-hover:text-primary">{layout.label}</h2>
      </div>


    </div>
  )
}
