import { Box, TextField, Stack, Typography, Button } from "@mui/material";

const ActionButton = ({ title, handleClick }: any) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#1350A",
        color: "#FFF",
        textTransform: 'none',
        mb: '5px'
      }}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

const Messages = (props: any) => {
  const { author, message, buttons, aligmnetLeft } = props.data;
  console.log(buttons, "buttons", author, message, "author, message");

  return (
    <Stack
      sx={{
        alignSelf: aligmnetLeft || "flex-end",
        backgroundColor: aligmnetLeft ? "#fff" : "#c4e5ff",
        p: "10px",
        borderRadius: "10px",
        mb: "15px",
      }}
    >
      <Typography
        sx={{
          color: "#165BC6",
          fontWeight: "600",
        }}
      >
        {author}
      </Typography>
      <Box>{message}</Box>
      <Stack mt={'5px'}>
        {buttons?.map((el: any) => (
          <ActionButton title={el.title} handleClick={el.handleClick} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Messages;
