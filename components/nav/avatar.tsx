import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { auth, signOut } from "@/auth";
import { Linksadmin, Linksuser } from "./links";

const Avatars = async () => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild={true}
        className="cursor-pointer bg-clip-border"
      >
        <Avatar>
          <AvatarImage src={session?.user?.image} alt="avatar" className="object-cover" />
          <AvatarFallback>
            {session?.user.firstname[0]}
            {session?.user.lastname[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={11}>
        <DropdownMenuItem>
          <div className="hidden flex-col text-xs md:flex">
            <span className="font-medium">
              {session?.user.firstname} {session?.user.lastname}
            </span>
            <span className="text-muted-foreground">
              {session?.user?.email}
            </span>
          </div>
        </DropdownMenuItem>

        {session?.user.rol === "admin" ? <Linksadmin /> : <Linksuser />}

        <DropdownMenuSeparator />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button size="sm" className="w-full">
            Signout
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatars;
