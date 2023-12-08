import React from "react";
import { SkipBack } from "@phosphor-icons/react";

const ButtonBack = () => {
  return (
    <div>
      <button
        onClick={() => history.back()}
        className="bg-primary p-2 rounded-full"
      >
        <SkipBack size={20} color="#fafafa" />
      </button>
    </div>
  );
};

export default ButtonBack;
