import { useEffect, useRef, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, TextField, IconButton, Typography, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Messages from "../Message/Message";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMessageList } from "../../redux/UserLocationSlice/selectors";
import { setMessageList } from "../../redux/UserLocationSlice/UserLocationSlice";

// 1. Перенести сообщения
// 2. Компонент сообщения
// 3. Компонент кнопки
// 4. Описать сценарии

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const messageList = useAppSelector(getMessageList);
  const dispatch = useAppDispatch();

  const SECOND_MESSAGE = {
    author: "Пользователь",
    message: <p>Ближайшее отделение</p>,
  };

  const ref = useRef(null);

  const THIRD_MESSAGE = {
    author: "ВТБ Помощник",
    message: (
      <>
        <p>
          Ближайшее отделение находится по адресу: г. Москва, ул. Киевская, д. 2
        </p>
        <p>Проложить маршрут?</p>
      </>
    ),
    buttons: [
      {
        title: "Проложить маршрут",
        handleClick: () => {},
      },
    ],
    aligmnetLeft: "flex-start",
  };

  const handleOfficeClick = () => {
    dispatch(setMessageList(SECOND_MESSAGE));

    setTimeout(() => {
      dispatch(setMessageList(THIRD_MESSAGE));
    }, 1500);
    // @ts-ignore
    ref?.current?.scrollIntoView();
  };

  const MESSAGE = {
    author: "ВТБ Помощник",
    message: (
      <>
        <p>Привет!</p>
        <p>
          Я ВТБ Помощник. Напишите пожалуйста какая услуга вам нужна, и я помогу
          получить ее максимально быстро: через наше приложение или подберу
          подходящее отделение
        </p>
      </>
    ),
    buttons: [
      {
        title: "Ближайшее отделение",
        handleClick: handleOfficeClick,
      },
      {
        title: "Оформить кредит",
        handleClick: handleOfficeClick,
      },
    ],
    aligmnetLeft: "flex-start",
  };

  useEffect(() => {
    console.log("render");

    dispatch(setMessageList(MESSAGE));
  }, [dispatch]);

  useEffect(() => {}, [messageList]);

  const handleSearchChange = (evt: any) => {
    setSearchValue(evt.target.value);
  };

  const handleClickSearch = () => {
    const SEARCH_MESSAGE = {
      author: "Пользователь",
      message: (
        <>
          <p>кредит на машину</p>
        </>
      ),
    };

    setSearchValue("");

    const CREDIT_MESSAGE = {
      author: "ВТБ Помощник",
      message: (
        <>
          <p>
            Для получения автокредита потребуется паспорт и фотография вашего
            котика.
          </p>
          <p>
            Вы можете оформить кредит дистанционно через наше приложение или в
            офисе банка. Как будет удобнее?
          </p>
        </>
      ),
      buttons: [
        {
          title: "Ближайшее отделение",
          handleClick: () => {},
        },
        {
          title: "Перейти в приложение",
          handleClick: () => {},
        },
      ],
      aligmnetLeft: "flex-start",
    };

    dispatch(setMessageList(SEARCH_MESSAGE));

    setTimeout(() => {
      dispatch(setMessageList(CREDIT_MESSAGE));
    }, 1500);

    // @ts-ignore
    ref?.current?.scrollIntoView();
  };

  const handleMouseDownSearch = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  console.log(messageList, "messageList");

  return (
    <Box
      p={"15px"}
      sx={{
        backgroundColor: "#f4f5f6",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "16px",
          mb: "10px",
        }}
        textAlign={"center"}
      >
        Умный помощник
      </Typography>
      <Box>
        <Stack>
          {messageList?.map((el: any) => (
            <Messages data={el} />
          ))}
        </Stack>
        <TextField
          fullWidth
          ref={ref}
          value={searchValue}
          placeholder={"Услуга, адрес или запрос..."}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickSearch}
                  onMouseDown={handleMouseDownSearch}
                >
                  {<SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Search;
