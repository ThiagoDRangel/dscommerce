import './styles.css';

type Props = {
  name: string;
}

function ProductCategory({ name }: Props) {
  return (
    <div className="dsc-category">
      {name}
    </div>
  );
}

export default ProductCategory