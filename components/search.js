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
      <div className="flex h-12">
        <input
          ref={searchedValue}
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search posts..."
          required
        ></input>
        <button
          type="submit"
          className="text-white right-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
