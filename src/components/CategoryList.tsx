import { Button, List, ListItem } from "@chakra-ui/react";
import useCategory from "../hooks/useCategories";
import usePostQueryStore from "../store/PostStore";

const CategoryList = () => {
  const { data } = useCategory();
  const selectedCategoryId = usePostQueryStore((s) => s.PostQuery.categoryId);
  const setSelectedCategoryId = usePostQueryStore((s) => s.setCategoryId);

  return (
    <List>
      <ListItem>
        <Button
          whiteSpace={"normal"}
          textAlign="left"
          fontSize="lg"
          variant="link"
          fontWeight={selectedCategoryId === null ? "bold" : "normal"}
          onClick={() => {
            setSelectedCategoryId(null); 
          }}
        >
          All
        </Button>
      </ListItem>
      {data?.map((category) => (
        <ListItem key={category.id}>
          <Button
            whiteSpace={"normal"}
            textAlign="left"
            fontSize="lg"
            variant="link"
            fontWeight={category.id === selectedCategoryId ? "bold" : "normal"}
            onClick={() => {
              setSelectedCategoryId(category.id);
            }}
          >
            {category.name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
