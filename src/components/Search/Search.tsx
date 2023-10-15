import { useState } from "react";
import { Box, TextField } from "@mui/material";

const MESSAGE_LIST = [
  {
    author: "ВТБ Помощник",
    message: (
      <>
        <p>Привет!</p>
        <p>Я ВТБ Помощник</p>
      </>
    ),
  },
];

// 1. Перенести сообщения
// 2. Компонент сообщения
// 3. Компонент кнопки
// 4. Описать сценарии

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("uuuuu");

  const handleSearchChange = (evt: any) => {
    console.log(evt);
  };

  return (
    <Box>
      <Box>wwww</Box>
      <Box>
        <TextField value={searchValue} onChange={handleSearchChange} />
      </Box>
    </Box>
  );
};

export default Search;
