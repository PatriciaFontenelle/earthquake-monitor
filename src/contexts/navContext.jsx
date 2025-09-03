import { createContext, useContext, useEffect, useState } from "react";

const NavContext = createContext();

export const useNav = () => {
  const context = useContext(NavContext);
  const { listOpened, setListOpened, highlightedItem, setHighlightedItem } =
    context;
  return { listOpened, setListOpened, highlightedItem, setHighlightedItem };
};

export const NavProvider = ({ children }) => {
  const [listOpened, setListOpened] = useState(true);
  const [highlightedItem, setHighlightedItem] = useState(null);

  useEffect(() => {
    if (highlightedItem)
      document.getElementById("cancel-selection-btn").focus();
  }, [highlightedItem]);

  return (
    <NavContext.Provider
      value={{ listOpened, setListOpened, highlightedItem, setHighlightedItem }}
    >
      {children}
    </NavContext.Provider>
  );
};
