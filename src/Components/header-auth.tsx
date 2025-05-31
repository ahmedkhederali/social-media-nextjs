"use client";
import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
export default function HeaderAuth() {
  const { data: session, status } = useSession();
  let authContent: React.ReactNode;
  if (status === "loading") {
    authContent = (
      <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
    );
  } else if (session?.user) {
    authContent = (
      <Popover placement="bottom">
        <PopoverTrigger>
        <Avatar src={session.user.image || ""} />
        </PopoverTrigger>
        <PopoverContent className="w-56 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-0.5">
            <Avatar src={session.user.image || ""} size="lg" className="flex-shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold truncate">{session.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <NavbarItem>
            <form action={actions.signOut}>
              <Button
                type="submit"
                color="secondary"
                variant="bordered"
                className="w-full text-center font-semibold text-purple-600 hover:bg-purple-100"
              >
                Sign Out
              </Button>
            </form>
          </NavbarItem>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signInWithGitHub}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>

        <NavbarItem>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
