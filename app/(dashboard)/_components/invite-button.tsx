import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Adjusted the Button styling for a more distinct look */}
        <Button variant="outline" className="border-2 border-black text-black-500   transition-colors duration-300 ease-in-out">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-white shadow-xl rounded-lg max-w-[880px] border">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};
