import CreateIcon from "./../../../../assets/add_new_button.png";
import "./styles.css";

const CreateButtonItem = (props) => {
  const { handleCreateButtonClick } = props;
  return (
    <div className="create-button-item" onClick={handleCreateButtonClick}>
      <img src={CreateIcon} alt="Create Icon" />
    </div>
  );
}

export default CreateButtonItem;