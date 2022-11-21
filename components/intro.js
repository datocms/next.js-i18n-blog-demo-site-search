import Search from "./search";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between items-center mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <div className="md:w-1/2 lg:w-1/3 w-full mt-10">
        <Search />
      </div>
    </section>
  );
}
