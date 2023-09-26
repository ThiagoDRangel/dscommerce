import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";
import './styles.css';

type Props = {
  message: string;
  onDialogAnswer: (answer: boolean) => void;
}

function DialogConfirmation({ message, onDialogAnswer }: Props) {
  return (
    <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)}>
      <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container">
          <div onClick={() => onDialogAnswer(false)} className="btn-choise">
            <ButtonInverse text="Cancel" />
          </div>
          <div onClick={() => onDialogAnswer(true)} className="btn-choise">
            <ButtonPrimary text="Confirm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogConfirmation;
