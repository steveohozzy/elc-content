type Props = {
  data: {
    title?: string;
    itemsCollection?: {
      items: {
        text?: string;
      }[];
    };
  };
};

export default function TrustStrip({ data }: Props) {
  const items = data.itemsCollection?.items ?? [];

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4">
      {data.title && (
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-gray-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {data.title}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-white p-6 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="text-center text-xs font-semibold uppercase tracking-wide text-gray-600"
          >
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}