import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const useNav = () => {
  const context = useContext(NavContext);
  const { listOpened, setListOpened } = context;
  return { listOpened, setListOpened };
};

export const NavProvider = ({ children }) => {
  const [listOpened, setListOpened] = useState(false);

  return (
    <NavContext.Provider value={{ listOpened, setListOpened }}>
      {children}
    </NavContext.Provider>
  );
};
