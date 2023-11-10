import React, { useState } from "react";

import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getUrl } from "../../api";
import { fromOptions } from "../helper";
import { TabPanel, useStyles } from "../TwoTabsComponent";

const Converter = ({ value, setBaseCurrency }) => {
  const classes = useStyles();

  const [currencyObj, setCurrencyObj] = useState({
    from: "USD",
    to: "USD",
    amount: 0,
  });

  const fetchConversionRates = async (url) => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const newResult = {
          ...currencyObj,
          result: data?.result[currencyObj.to],
        };

        setBaseCurrency(newResult);
      } else {
        console.error("Failed to fetch conversion rates");
      }
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
    }
  };

  const changeCurrency = (event) => {
    const { name, value } = event.target;

    setCurrencyObj((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const convertFromTo = () => {
    if (currencyObj.amount > 0 && !!currencyObj.from && !!currencyObj.to) {
      fetchConversionRates(getUrl(currencyObj));
    } else {
      alert("Please enter the amount!!!");
    }
  };

  return (
    <TabPanel value={value} index={0}>
      <div className={classes.tabContent}>
        <Typography variant="h4" gutterBottom>
          Converter
        </Typography>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Select
            value={currencyObj.from}
            onChange={changeCurrency}
            label="Select an option"
            id="from"
            size="small"
            name="from"
          >
            {fromOptions?.map((item) => (
              <MenuItem value={item.title} key={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>

          <TextField
            value={currencyObj.amount}
            onChange={changeCurrency}
            size="small"
            label="Amount"
            variant="outlined"
            name="amount"
          />

          <Select
            value={currencyObj.to}
            onChange={changeCurrency}
            label="Select an option"
            id="to"
            size="small"
            name="to"
          >
            {fromOptions?.map((item) => (
              <MenuItem value={item.title} key={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>

          <Button onClick={convertFromTo} variant="contained" color="primary">
            Convert
          </Button>
        </Paper>
      </div>
    </TabPanel>
  );
};

export default Converter;
