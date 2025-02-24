import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => {
      console.error("Login Error:", error);
      toast("Failed to sign in. Please try again.");
    },
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(resp.data));

      setOpenDailog(false);
      window.location.reload();

    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="shadow-sm flex justify-between items-center">
      <img src="/logo.png" />
      <div>
        {user ? (
          <div className="flex items-center gap-3 cursor-pointer">

            <a href="/create-trip">
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>

            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="ml-[150px]">
                <img src="/logo.png" alt="logo" />
              </div>
              <h2 className="font-bold text-lg text-center">
                Sign In With Google
              </h2>
              <p className="text-center">
                Sign in to the App With Google authentication securely
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
