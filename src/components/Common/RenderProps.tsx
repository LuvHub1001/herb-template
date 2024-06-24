import { ReactNode } from "react";

interface Props<T> {
  className: string;
  items: T[];
  render: (item: T) => ReactNode;
}

function RenderProps<T>({ className, items, render }: Props<T>) {
  return (
    { items } && (
      <div className={className}>
        {items.map((item: T, _idx: number) => {
          return <div key={_idx}>{render(item)}</div>;
        })}
      </div>
    )
  );
}

export default RenderProps;
