import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Container, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Converter from "./Converter/Converter";
import Currencies from "./Currencies/Currencies";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  tabsContainer: {
    width: "50%", // Adjust the width as needed
  },
}));

export function TabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function CenteredTabsComponent() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const [baseCurrency, setBaseCurrency] = useState({
    from: "",
    to: "",
    amount: "0",
    result: 0,
  });
  const [totalCurrencies, setTotalCurrencies] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.tabsContainer}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Converter" sx={{ color: "#fff" }} />
            <Tab label="Currencies" sx={{ color: "#fff" }} />
          </Tabs>
        </AppBar>

        <Converter value={value} setBaseCurrency={setBaseCurrency} />

        <Currencies value={value} setTotalCurrencies={setTotalCurrencies} />

        <footer>
          {!!baseCurrency?.result && value === 0 && (
            <h2>{`${baseCurrency?.from} ${baseCurrency?.amount} = ${baseCurrency?.to} ${baseCurrency?.result}`}</h2>
          )}

          {totalCurrencies.length !== 0 &&
            value === 1 &&
            totalCurrencies.map((item) => {
              const { fromCurrency, fromValue, toCurrency, toValue } = item;

              return (
                <MenuItem value={item.title} key={item.id}>
                  {`${fromValue} ${fromCurrency} = ${toValue} ${toCurrency}`}
                </MenuItem>
              );
            })}
        </footer>
      </Container>
    </div>
  );
}
