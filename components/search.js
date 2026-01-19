import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Search() {
  const searchedValue = useRef("");
  const router = useRouter();
  const { term } = router.query;

  useEffect(() => {
    if (term) {
      searchedValue.current.value = term;
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchedValue.current.value) {
      router.push("/search/" + searchedValue.current.value);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex gap-2">
        <input
          ref={searchedValue}
          type="search"
          id="default-search"
          className="grow rounded-md border border-solid border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Search posts..."
          required
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
