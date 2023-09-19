import './styles.css'

type Props = {
  text: string;
}

function ButtonInverse({text}: Props) {
  return (
    <div className="dsc-btn dsc-btn-white">
       {text}
    </div>
  );
}

export default ButtonInverse