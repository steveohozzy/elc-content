type CTASectionData = {
  text?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function CTASection({ data }: { data: CTASectionData }) {
  return (
    <section className="bg-black text-white py-16 text-center">
      {data.text && <p>{data.text}</p>}

      {data.buttonText && data.buttonLink && (
        <a href={data.buttonLink} className="mt-4 inline-block underline">
          {data.buttonText}
        </a>
      )}
    </section>
  );
}