import { createContext, useContext, useState, useRef } from "react";
import { FilesTree } from "./utils/fileUtil";

const AppContext = createContext({});

const AppProvider = (props) => {
  const files = useRef(new FilesTree("root", true));
  const [currFilesFolders, setCurrFilesFolders] = useState([]);
  const [pathElements, setPathElements] = useState([]);

  const appContextValue = {
    files,
    currFilesFolders,
    setCurrFilesFolders,
    pathElements,
    setPathElements,
  };

  return <AppContext.Provider value={appContextValue} {...props} />;
} 

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext }