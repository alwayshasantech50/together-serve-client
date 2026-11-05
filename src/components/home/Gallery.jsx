import Image from "next/image";


const photos = [
  {
    id: 1,
    image: "/images/community-cleanup.jpg",
    title: "Cleaner spaces",
    description: "Making room for a healthier neighborhood.",
    alt: "Volunteers collecting litter in a forest",
  },
  {
    id: 2,
    image: "/images/community-teamwork.jpg",
    title: "Shared effort",
    description: "Planning together. Making a difference together.",
    alt: "A volunteer organizing a cleanup with a clipboard",
  },
  {
    id: 3,
    image: "/images/shore-cleanup.jpg",
    title: "Care for nature",
    description: "Protecting the places we all share.",
    alt: "A group of volunteers collecting litter along a shoreline",
  },
];

const Gallery = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
          Community in action
        </p>

        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          What community care looks like.
        </h2>

        <p className="mt-4 leading-7">
          A cleaner park, a shared task, a protected shoreline.
          Meaningful change starts with people showing up.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {photos.map((photo) => (
          <article
            key={photo.id}
            className="overflow-hidden rounded-2xl border border-base-300 bg-base-200"
          >
            <Image
              src={photo.image}
              alt={photo.alt}
              width={600}
              height={450}
              sizes="(max-width: 767px) 100vw, 33vw"
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-bold">{photo.title}</h3>

              <p className="mt-2 text-sm leading-7">
                {photo.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 text-sm opacity-70">
        Illustrative community-service photographs from Unsplash.
      </p>
    </section>
  );
};

export default Gallery;