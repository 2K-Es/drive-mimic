import { Modal, Button } from "@mui/material";
import "./styles.css";

const DeleteItemModal = (props) => {
  const { deleteModalOpen, handleDeleteModalClose, itemName, handleDeleteItem } = props;

  return (
    <Modal
      open={deleteModalOpen}
      onClose={handleDeleteModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}
    >
      <div className="modal-container">
        <div id="modal-modal-title">Delete</div>
        <p>Are you sure you want to delete <b>{itemName}</b>?</p>
        <div style={{ display: "flex" }}>
          <Button color="error" variant="contained" style={{ marginRight: "5px" }} onClick={handleDeleteItem}>Delete</Button>
          <Button color="error" variant="outlined" onClick={handleDeleteModalClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItemModal;