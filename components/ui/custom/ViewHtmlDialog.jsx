import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ViewCodeDialog({ openDialog, htmlCode, closeDialog }) {
  return (
    <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Code</DialogTitle>
          <DialogDescription asChild >
            <div className="max-h-[400px] overflow-auto bg-gray-200 rounded-lg p-5">
              <pre>
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

