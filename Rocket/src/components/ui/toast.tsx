import { Button } from "./button";
import { X } from "lucide-react";
import * as Toast from "@radix-ui/react-toast";

interface Props {
  status?: string;
  description?: string;
  openToast?: boolean;
  setOpenToast?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToastComponent({
  status,
  description,
  openToast,
  setOpenToast,
}: Props) {
  return (
    <>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot"
          open={openToast}
          onOpenChange={setOpenToast}
        >
          <Toast.Title className="ToastTitle">{status}</Toast.Title>
          <Toast.Description asChild>
            <div className="ToastDescription">{description}</div>
          </Toast.Description>
          <Toast.Action
            className="ToastAction"
            asChild
            altText="Goto schedule to undo"
          >
            <Button className="text-red-900 bg-white">
              <X />
            </Button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
}
