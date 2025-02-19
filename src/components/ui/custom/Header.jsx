import React from "react";
import { Button } from "../button";

function Header() {
  return (
    <div className="shadow-sm flex justify-between items-center">
      <img src="/logo.png" />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
}

export default Header;
