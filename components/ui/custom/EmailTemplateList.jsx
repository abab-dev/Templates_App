import { React, useState } from "react";
import { Button } from "../button";
function TemplateList() {
  const [emailList, setEmailLIst] = useState([])
  return (
    <div>
      <h2 className="mt-20 font-extrabold text-xl text-primary">Workspace</h2>
      {
        emailList?.length == 0 &&
        <div className="flex justify-center flex-col mt-7 items-center">
          <p>Add image here </p>
          <Button className="mt-7">+ Create new</Button>
        </div>
      }
    </div>
  )
}
export default TemplateList 
