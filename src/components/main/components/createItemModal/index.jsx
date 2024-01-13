import { Modal, Tabs, Tab, Input, Button } from "@mui/material";
import { useAppContext } from "./../../../../AppContext";
import "./styles.css";

const CreateItemModal = (props) => {
  const { createModalOpen, handleCreateModalClose, tabValue, itemName, handleTabChange, handleInputChange, handleCreateItem } = props;
  const { files, currFilesFolders, setCurrFilesFolders, pathElements, setPathElements} = useAppContext();

  const checkIfSameNameExists = () => {
    for (let i = 0; i < currFilesFolders.length; i++) {
      const currItem = currFilesFolders[i];
      if (currItem.name === itemName) {
        return true;
      }
    }
    return false;
  };

  return (
    <Modal
      open={createModalOpen}
      onClose={handleCreateModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}
    >
      <div className="modal-container">
        <div id="modal-modal-title">Create</div>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Tab value={0} label="File" />
          <Tab value={1} label="Folder" />
        </Tabs>
        <Input placeholder={tabValue === 0 ? "File Name" : "Folder Name"} value={itemName} onChange={handleInputChange} maxLength={50} />
        <span style={{ color : "red" }}>
          {checkIfSameNameExists() ? "File / Folder name already exists" : ""}
        </span>
        <div>
          <Button variant="contained" style={{ marginRight: "5px" }} disabled={checkIfSameNameExists() || itemName.length === 0} onClick={handleCreateItem}>Create</Button>
          <Button variant="outlined" onClick={handleCreateModalClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateItemModal;

