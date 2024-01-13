import { useState, useRef } from "react";
import { FilesTree } from "../../utils/fileUtil";
import FileItem from "./components/fileItem";
import CreateButtonItem from "./components/createItem";
import CreateItemModal from "./components/createItemModal";
import DeleteItemModal from "./components/deleteItemModal";
import RenameItemModal from "./components/renameItemModal";
import "./styles.css";
import {useAppContext} from "../../AppContext";

const Main = () => {
  const { files, currFilesFolders, setCurrFilesFolders, pathElements, setPathElements} = useAppContext();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [itemName, setItemName] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedNewName, setSelectedNewName] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  }
  const handleCreateItem = () => {
    setCreateModalOpen(false);
    setItemName("");

    const newItem = {
      name: itemName,
      isFolder: tabValue === 1 ? true : false
    };

    setCurrFilesFolders(prevState => [...prevState, newItem]);

    if (tabValue === 1) {
      files.current.addChild(newItem.name, true);
    } else {
      files.current.addChild(newItem.name, false);
    }
  }

  const handleOpenFolder = (folderName) => {
    const folder = files.current.getChild(folderName);
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
    const newPathElements = [...pathElements];
    newPathElements.push(folderName);
    setPathElements(newPathElements);
    
    setCurrFilesFolders(newCurrFilesFolders);
  };

  const handleCreateButtonClick = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
  };

  const handleDelete = (name) => {
    const newCurrFilesFolders = currFilesFolders.filter(item => item.name !== name);
    setCurrFilesFolders(newCurrFilesFolders);
    files.current.deleteChild(name);
  };

  const handleDeleteOpen = (fileName) => {
    setSelectedItem(fileName);
    setDeleteModalOpen(true);
  }

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteItem = () => {
    setDeleteModalOpen(false);
    handleDelete(selectedItem);
  };

  const handleRename = (name) => {
    const newCurrFilesFolders = currFilesFolders.map(item => {
      if (item.name === name) {
        return {
          ...item,
          name: selectedNewName
        };
      }
      return item;
    });
    setCurrFilesFolders(newCurrFilesFolders);
    files.current.renameChild(name, selectedNewName);
  }

  const handleRenameOpen = (fileName) => {
    setSelectedItem(fileName);
    setSelectedNewName(fileName);
    setRenameModalOpen(true);
  }

  const handleRenameModalClose = () => {
    setRenameModalOpen(false);
  }

  const handleRenameItem = () => {
    setRenameModalOpen(false);
    handleRename(selectedItem);
  }

  const handleNewNameChange = (event) => {
    setSelectedNewName(event.target.value);
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currFilesFolders.map((item, index) => (
          <div key={`${index-item.name}`} className="item" onDoubleClick={() => handleOpenFolder(item.name)}>
            <FileItem 
              key={`${index-item.name}-component`}
              name={item.name} 
              isFolder={item.isFolder} 
              setSelectedItem={setSelectedItem} 
              handleDeleteOpen={handleDeleteOpen}
              handleRenameOpen={handleRenameOpen}
              handleOpenFolder={handleOpenFolder}
            />
          </div>
        ))}
        <div className="item-create">
          <CreateButtonItem handleCreateButtonClick={handleCreateButtonClick}/>
        </div>
      </div>
      <div>
        <CreateItemModal 
          createModalOpen={createModalOpen} 
          handleCreateModalClose={handleCreateModalClose}
          tabValue={tabValue}
          itemName={itemName}
          handleTabChange={handleTabChange}
          handleInputChange={handleInputChange}
          handleCreateItem={handleCreateItem}
        />
        <DeleteItemModal 
          deleteModalOpen={deleteModalOpen} 
          handleDeleteModalClose={handleDeleteModalClose}
          itemName={selectedItem}
          handleDeleteItem={handleDeleteItem}
        />
        <RenameItemModal
          renameModalOpen={renameModalOpen}
          handleRenameModalClose={handleRenameModalClose}
          itemName={selectedNewName}
          handleRenameItem={handleRenameItem}
          handleInputChange={handleNewNameChange}
        />
      </div>
    </div>
  );
};

export default Main;