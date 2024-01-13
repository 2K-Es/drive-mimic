import React, {useState} from "react";
import { Breadcrumb, IconButton, ButtonToolbar } from "rsuite";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import "./styles.css";
import { useAppContext } from "../../AppContext";

const Topbar = (props) => {
  const { files, currFilesFolders, setCurrFilesFolders, pathElements, setPathElements} = useAppContext();

  const handleBackButtonClick = () => {
    if (files.current.isRoot()) return;
    
    const parent = files.current.getParent();
    const children = parent.children;
    const newCurrFilesFolders = [];
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const newItem = {
        name: child.name,
        isFolder: child.isFolder
      };
      newCurrFilesFolders.push(newItem);
    }

    files.current = parent;
    const newPathElements = [...pathElements];
    newPathElements.pop();
    setPathElements(newPathElements);
    setCurrFilesFolders(newCurrFilesFolders);
  };

  const handleBreadcrumbClick = (event) => {
    const folderName = event.target.innerText;
    const folder = files.current.traverseToParent(folderName);

    const children = folder.getChildren();
    const newCurrFilesFolders = [];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const newItem = {
        name: child.name,
        isFolder: child.isFolder
      };
      newCurrFilesFolders.push(newItem);
    }

    files.current = folder;
    const newPathElements = files.current.getPathElements();
    setPathElements(newPathElements);

    setCurrFilesFolders(newCurrFilesFolders);
  };

  return (
    <div style={{ display: "flex" }}>
      <ButtonToolbar style={{ marginRight : "10px" }}>
        <IconButton className="rsuite-icon-button" icon={<ArowBackIcon /> } size="lg" onClick={handleBackButtonClick}/>
      </ButtonToolbar>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item 
          key="root"
          href="#"
          onClick={handleBreadcrumbClick}
        >
            Root
        </Breadcrumb.Item>
        {pathElements.map((pathElement, index) => {
          return( 
            <Breadcrumb.Item 
              key={`${index-pathElement}`} 
              href="#"
              onClick={handleBreadcrumbClick}
            >
              {pathElement}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  );
};

export default Topbar;