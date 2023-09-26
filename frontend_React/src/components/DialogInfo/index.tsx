import ButtonPrimary from "../ButtonPrimary";

type Props = {
  message: string;
  onDialogClose: () => void;
}
function DialogInfo({ message, onDialogClose }: Props) {
  return (
    <div className="dsc-dialog-background" onClick={() => onDialogClose()}>
      <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container" onClick={() => onDialogClose()}>
          <ButtonPrimary text="ok" />
        </div>
      </div>
    </div>
  );
}

export default DialogInfo;
