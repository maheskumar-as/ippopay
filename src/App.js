import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import Table from "./Table";
import { addData, retrieveData } from "./api";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState({
    array1: [],
    array2: [],
    difference: 0,
  });
  const [tableRows, setTableRows] = useState([]);
  const handleSplit = () => {
    const newArray = inputValue.split(",").filter((item) => item != "");
    if (newArray.length > 0) {
      setResult(findMinimizedSum(newArray));
    }
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.replace(/[^0-9,]/g, "");
    setInputValue(formattedValue);
  };

  function findMinimizedSum(numbers) {
    numbers = numbers.sort((a, b) => b - a);
    const array1 = Array();
    const array2 = Array();
    let sum1 = 0;
    let sum2 = 0;
    console.log(numbers);
    for (let ValueNumber of numbers)
      if (sum1 <= sum2) {
        array1.push(ValueNumber);
        sum1 = sum1 + parseInt(ValueNumber);
      } else {
        array2.push(ValueNumber);
        sum2 = sum2 + parseInt(ValueNumber);
      }
    const difference = Math.abs(sum2 - sum1);
    return { array1, array2, difference: difference };
  }

  function handleAdd() {
    addData(result).then(() => {
      fetchData();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await retrieveData();
      setTableRows(response);
      console.log("Retrieved entries:", response);
    } catch (error) {
      console.error("Error retrieving entries:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            IppoPay
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: "20px" }}>
        <Card sx={{ minHeight: "400px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h3>Split Minimum Difference Array</h3>
          </div>

          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={6}>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <TextField
                  label='Enter Numbers of Array'
                  placeholder='Comma Separated'
                  fullWidth
                  value={inputValue}
                  onChange={handleInputChange}
                  variant='outlined'
                  size='small'
                />

                <Button
                  variant='contained'
                  sx={{ marginTop: "20px" }}
                  onClick={handleSplit}
                  color='primary'>
                  Split
                </Button>
              </Box>
            </Grid>

            <Grid container justifyContent='center' marginTop={2}>
              <div
                style={{
                  height: "40px",
                  lineHeight: "40px",
                  fontSize: "30px",
                }}>
                {" "}
                Array 1 :
              </div>
              <Grid item xs={12} sm={6} display={"flex"} columnSpacing={5}>
                {result.array1.map((aval) => {
                  return (
                    <Paper
                      height={"40px"}
                      sx={{
                        backgroundColor: "darkgreen",
                        color: "#ffffff",
                        height: "45px",
                        minWidth: "45px",
                        fontSize: "20px",
                        lineHeight: "45px",
                        padding: "5px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginLeft: "10px",
                      }}>
                      {aval}
                    </Paper>
                  );
                })}
              </Grid>
            </Grid>

            <Grid container justifyContent='center' marginTop={2}>
              <div
                style={{
                  height: "40px",
                  lineHeight: "40px",
                  fontSize: "30px",
                }}>
                {" "}
                Array 2 :
              </div>
              <Grid item xs={12} sm={6} display={"flex"} columnSpacing={5}>
                {result.array2.map((aval) => {
                  return (
                    <Paper
                      height={"40px"}
                      sx={{
                        backgroundColor: "aquamarine",
                        color: "#030303",
                        height: "45px",
                        minWidth: "45px",
                        fontSize: "20px",
                        padding: "5px",
                        lineHeight: "45px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginLeft: "10px",
                      }}>
                      {aval}
                    </Paper>
                  );
                })}
              </Grid>
            </Grid>

            <Paper
              sx={{
                minWidth: "45px",
                width: "50%",
                fontSize: "20px",
                lineHeight: "45px",
                padding: "5px",
                fontWeight: "600",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "50px",
              }}>
              <div>Minimum Difference: </div>
              <div style={{ fontSize: "50px" }}>{result.difference}</div>
            </Paper>
            <Grid container justifyContent='center' marginTop={2}>
              <Button
                onClick={handleAdd}
                sx={{ marginBottom: "20px" }}
                variant='contained'>
                {" "}
                Save to DB
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Grid
          container
          justifyContent='center'
          sx={{ marginTop: "50px", marginBottom: "50px" }}>
          <Table data={tableRows} />
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
