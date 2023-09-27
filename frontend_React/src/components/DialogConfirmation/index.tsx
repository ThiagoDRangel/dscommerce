import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";
import './styles.css';

type Props = {
  id: number;
  message: string;
  onDialogAnswer: (answer: boolean, id: number) => void;
}

function DialogConfirmation({ message, onDialogAnswer, id }: Props) {
  return (
    <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false, id)}>
      <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container">
          <div onClick={() => onDialogAnswer(false, id)} className="btn-choise">
            <ButtonInverse text="Cancel" />
          </div>
          <div onClick={() => onDialogAnswer(true, id)} className="btn-choise">
            <ButtonPrimary text="Confirm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogConfirmation;
