import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ViewCodeDialog({ openDialog, htmlCode, closeDialog }) {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Code</DialogTitle>
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

