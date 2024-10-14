"use client";

import React, { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState<string>("SEK");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Function to handle conversion
  const convert = async () => {
    if (isNaN(amount) || amount <= 0) {
      setResult("Please enter a valid amount.");
      return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    setIsLoading(true); // Set loading state

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (!rate) {
        setResult("Error: Could not retrieve exchange rate.");
        return;
      }

      const convertedAmount = amount * rate;
      setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(3)} ${toCurrency}`);
    } catch (error) {
      console.error(error);
      setResult("Error fetching exchange rate.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-update when currencies or amount change
  useEffect(() => {
    convert();
  }, [fromCurrency, toCurrency, amount]); // Runs convert() on any change to these values

  return (
    <form>
      <div className="w-56 h-auto mx-auto my-auto mt-2 mb-2 p-4 rounded-lg outline outline-1 border border-blue-500">

        <div className="text-center">
          <h2 className="text-sm font-bold mb-2">Currency Converter</h2>
          <div className="flex flex-col">
            <label className="text-left m-1 text-sm">Enter Amount</label>
            <input
              type="number"
              className="border border-gray-500 rounded-md p-2 w-auto h-8 text-xs bg-transparent" 
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* From and To section in one line */}
        <div className="flex text-xs mt-2 mb-4">
          <div>
            <label className="text-xs">From</label>
            <CurrencySelect
              selectedCurrency={fromCurrency}
              handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFromCurrency(e.target.value)
              }
            />
          </div>

          <div className="mx-1 my-3">
            <button
              type="button"
              className="border border-black rounded-full hover:bg-gray-300 mt-2 p-1"
              onClick={handleSwapCurrencies}
              >
              <svg
                width="12"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                  fill="#000"
                />
              </svg>
            </button>
          </div>

          <div>
            <label className="text-xs">To</label>
            <CurrencySelect
              selectedCurrency={toCurrency}
              handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setToCurrency(e.target.value)
              }
            />
          </div>
        </div>

        <button
          type="button"
          className={`w-full py-2 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-800 transition duration-200 
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
            onClick={convert}
          >
          {isLoading ? "Getting Rate..." : "Get Exchange Rate"}
        </button>

        {result && (
          <p className="mt-4 p-2 bg-black text-white text-center rounded-md text-sm">
            {result}
          </p>
        )}
      </div>
    </form>
  );
}
