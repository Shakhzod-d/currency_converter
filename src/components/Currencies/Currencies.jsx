import React, { useEffect, useState } from "react";

import { fromOptions } from "../helper";
import { TabPanel, useStyles } from "../TwoTabsComponent";
import { MenuItem, Paper, Select, Typography } from "@mui/material";
import { getUrl } from "../../api";

const Currencies = ({ value, setTotalCurrencies }) => {
  const classes = useStyles();
  const [currencyName, setCurrencyName] = useState("USD");
  const [amount, setAmount] = useState(1);

  const fetchConversionRates = async (url) => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        let result = [];
        for (let key in data?.results) {
          const newCurrencyObj = {
            id: `${Date.now() + data?.results[key] + key}`,
            fromCurrency: currencyName,
            fromValue: amount,
            toCurrency: key,
            toValue: data?.results[key],
          };
          result.push(newCurrencyObj);
        }

        setTotalCurrencies(result);
      } else {
        console.error("Failed to fetch conversion rates");
      }
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
    }
  };

  useEffect(() => {
    const currencyObj = {
      from: currencyName,
      to: fromOptions.map((item) => item.title).toString(),
      amount,
    };

    fetchConversionRates(getUrl(currencyObj, true));
  }, [currencyName]);

  return (
    <TabPanel value={value} index={1}>
      <div className={classes.tabContent}>
        <Typography variant="h4" gutterBottom>
          Correncies
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
            value={currencyName}
            onChange={(e) => setCurrencyName(e.target.value)}
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
        </Paper>
      </div>
    </TabPanel>
  );
};

export default Currencies;
