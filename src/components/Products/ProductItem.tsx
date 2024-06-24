interface productProps {
  productItem: {
    title: string;
  };
}

function ProductItem({ productItem }: productProps) {
  return <div>{productItem.title}</div>;
}

export default ProductItem;
