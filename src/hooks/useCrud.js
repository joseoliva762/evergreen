import { useState } from "react";

export const useCrud = () => {
  const [crud, setCrud] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
    list: false,
  });

  const canAction = (permissions, module, action) => {
    return (
      permissions.includes("*") ||
      permissions.includes(`${module}:*`) ||
      permissions.includes(`${module}:${action}`)
    );
  };

  const setActions = (permissions, module, action) => {
    setCrud((prevState) => ({
      ...prevState,
      [action.toLowerCase()]: canAction(permissions, module, action)
    }));

  }

  return {
    crud,
    setActions
  }
}