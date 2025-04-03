import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function ViewCodeDialog({ openDialog, htmlCode, closeDialog }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Code</DialogTitle>
          <Button size="sm" onClick={handleCopyClick}>{copied ? "Copied!" : "Copy"}</Button>
          <DialogDescription asChild >
            <div className="max-h-[400px] overflow-x-auto bg-gray-200 rounded-lg p-5">
              <pre className="whitespace-pre-wrap break-all ">
                <code>
                  {htmlCode}
                </code>
              </pre></div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

