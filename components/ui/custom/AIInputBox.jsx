'use client'
import React from "react";
import { useState } from "react";
import Prompt from "@/Prompt";
import { Textarea } from "../textarea";
import { Button } from "../button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";


export default function AIInputBox() {
  const [userInput, setUserInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const saveTemplate = useMutation(api.emailTemplate.saveTemplate);
  const router = useRouter()
  const { user } = useUser();
  const convex = useConvex()
  const hasUserCredits = convex.query(api.users.hasCredits, { clerkId: user?.id || "empty" });

  const decrementUserCredits = useMutation(api.users.decrementCredits);

  const onGenerate = async () => {
    if (!hasUserCredits) {
      alert("Insufficient credits. Please add credits to your account.");
      return;
    }
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tId = uuidv4();

    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL;

      const result = await axios.post(`${baseUrl}/api/ai-email-generate`, {
        prompt: PROMPT,
        userEmail: "",
        tId: 0,
      });
      await saveTemplate({
        tId: tId,
        design: result.data.data,
        email: user?.primaryEmailAddress?.emailAddress || "",
        description: userInput,
      });
      decrementUserCredits(
        { clerkId: user?.id || "empty" }

      );
      router.push('/editor/' + tId)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p>Provide the details to create your Template</p>
      <Textarea onChange={(e) => setUserInput(e.target.value)} placeholder="Start writing here" rows="5" className={"text-xl my-5 "} />
      <Button
        disabled={!userInput || userInput.length === 0 || isLoading}
        onClick={onGenerate}
      >
        {isLoading ? <span><Loader2 className="animate-spin"></Loader2>Please wait...</span> : 'Generate'}
      </Button>
    </div>
  );

}
