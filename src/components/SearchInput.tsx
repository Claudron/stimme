import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import usePostQueryStore from "../store/PostStore";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = usePostQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchText(""); // Clear the search text
    if (ref.current) ref.current.value = ""; // Clear the input field
    navigate("/posts"); // Navigate to the posts grid
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchText(ref.current.value);
        navigate("/posts");
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="search posts..."
          variant="filled"
        />
        <Button onClick={clearSearch} ml={2}>
          Clear Search
        </Button>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
