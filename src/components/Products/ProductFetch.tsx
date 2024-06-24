import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { RenderProps, ProductItem } from "../";

interface ProductItemType {
  title: string;
}

function ProductFetch() {
  const productItems = useFetch(get, "products");

  return (
    productItems && (
      <div>
        <RenderProps
          className="product-render"
          items={productItems.data}
          render={(productItem: ProductItemType) => {
            return <ProductItem productItem={productItem} />;
          }}
        />
      </div>
    )
  );
}

export default ProductFetch;
