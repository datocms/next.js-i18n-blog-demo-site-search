import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Search() {
  const searchedValue = useRef("");
  const router = useRouter();
  const { term } = router.query;

  useEffect(() => {
    if (term) {
      searchedValue.current.value = term; //don't
    }
  }, []);

  const handleSearch = () => {
    if (searchedValue.current.value) {
      router.push("/search/" + searchedValue.current.value);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <input
      onKeyDown={handleEnter}
      ref={searchedValue}
      type="search"
      className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="button-addon3"
    ></input>
  );
}
