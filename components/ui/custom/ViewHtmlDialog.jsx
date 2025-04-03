import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ViewCodeDialog({ openDialog, htmlCode, closeDialog }) {

  const handleCopyClick = () => {
    navigator.clipboard.writeText(htmlCode);
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Code</DialogTitle>
          <Button size="sm" onClick={handleCopyClick}>Copy</Button>
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

