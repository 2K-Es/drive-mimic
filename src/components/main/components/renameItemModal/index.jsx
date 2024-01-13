import { Modal, Button, Input } from "@mui/material";
import "./styles.css";

const RenameItemModal = (props) => {
  const { renameModalOpen, handleRenameModalClose, itemName, handleRenameItem, handleInputChange } = props;

  return (
    <Modal
      open={renameModalOpen}
      onClose={handleRenameModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}
    >
      <div className="modal-container">
        <div id="modal-modal-title">Rename</div>
        <Input placeholder="New File / Folder Name" value={itemName} onChange={handleInputChange} />
        <div
          style={{
            display: "flex",
          }}
        >
          <Button variant="contained" style={{ marginRight: "5px" }} onClick={handleRenameItem}>Rename</Button>
          <Button variant="outlined" onClick={handleRenameModalClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameItemModal;