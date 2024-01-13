import FileIcon from "./../../../../assets/file.png";
import FolderIcon from "./../../../../assets/folder.png";
import MoreIcon from '@rsuite/icons/More';
import { IconButton, Whisper, Dropdown } from "rsuite";
import "./styles.css";

const FileItem = (props) => {

  const { handleDeleteOpen, handleRenameOpen, handleOpenFolder } = props;

  const renderMenu = ({ onClose, left, top }, ref) => {
    const onMenuSelect = (eventKey, event) => {
      if (eventKey === "Delete") {
        handleDeleteOpen(props.name);
      } else if (eventKey === "Rename") {
        handleRenameOpen(props.name);
      }
      onClose();
    }
    return (
      <Dropdown.Menu
        ref={ref}
        className="custom-dropdown-menu"
        style={{ left, top, position: "absolute" }}
      >
        <Dropdown.Item eventKey={"Rename"} className="dropdown-item" onSelect={onMenuSelect}>Rename</Dropdown.Item>
        <Dropdown.Item eventKey={"Delete"} className="dropdown-item" onSelect={onMenuSelect}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    );
  };
  
  return (
    <div className="file-folder-item" >
      <img onDoubleClick={() => handleOpenFolder(props.name)} src={props.isFolder ? FolderIcon : FileIcon} alt="File Icon" />
      <p onDoubleClick={() => handleOpenFolder(props.name)}>{props.name}</p>
      <div className="icon-container">
        <Whisper
          placement="bottomStart"
          trigger="click"
          speaker={renderMenu}
        >
          <IconButton className="more-icon" icon={<MoreIcon />} size="xs" />
        </Whisper>
      </div>
    </div>
  );
}

export default FileItem;