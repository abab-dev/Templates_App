'use client'
import React from "react";
import { useState } from "react";
import Prompt from "@/Prompt";
import { Textarea } from "../textarea";
import { Button } from "../button";
import axios from "axios";
export default function AIInputBox() {
  const [userInput, setUserInput] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const onGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + '\n-' + userInput;

    setIsLoading(true)
    try {
      const result = await axios.post('/api/ai-email-generate',{
        prompt:PROMPT,
        userEmail:'',
        tId:0 

      }
  )

      console.log(result)
      setIsLoading(false)
    }catch(e){
      console.log(e)
      setIsLoading(false)
    }
  }
  return (
    <div className="mt-5">
      <p>Provide the details to create your Template</p>
      <Textarea onChange={(e) => setUserInput(e.target.value)} placeholder="Start writing here" rows="5" className={"text-xl my-5"}></Textarea>
      <Button
        disabled={(userInput?.length == 0 || isLoading)}
        
        onClick={onGenerate}
        >GENERATE</Button>
    </div>
  )

}
