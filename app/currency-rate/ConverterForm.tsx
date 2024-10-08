"use client";

import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";

export default function ConverterForm() {
    const [fromCurrency, setFromCurrency] = useState<string>("SEK");
    const [toCurrency, setToCurrency] = useState<string>("USD");
    const [amount, setAmount] = useState<number>(1);
    const [result, setResult] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const getExchangeRate = async () => {
        const API_KEY = "cd9ad038b7a306b5c61dd5a8";
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;

        setIsLoading(true);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Something went wrong!");

            const data = await response.json();
            const rate = (data.conversion_rate * amount).toFixed(3);
            setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            console.error(error);
            setResult("Error fetching exchange rate.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getExchangeRate();
    };

    useEffect(() => {
        getExchangeRate();
    }, [fromCurrency, toCurrency, amount]);

    return (
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col">
                    <label className="text-left m-1 text-sm">Enter Amount</label>
                    <input 
                        type="number" 
                        className="border border-gray-300 rounded-md p-2 w-auto h-8 text-xs bg-transparent" 
                        value={amount} 
                        onChange={(e) => setAmount( Number(e.target.value))} 
                    />
                </div>

                {/* From and To section in one line */}
                <div className="flex text-justify mb-4 text-xs m-2">
                    <div >
                        <label className="text-xs">From</label>
                        <CurrencySelect
                            selectedCurrency={fromCurrency}
                            handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
                        />
                    </div>

                    <div className=" mx-1 my-3">
                        <button
                            type="button"
                            className="border border-black rounded-full hover:bg-gray-300 mt-2 p-1"
                            onClick={handleSwapCurrencies}
                        >
                            <svg width="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                                    fill="#000"/>
                            </svg>
                        </button>
                    </div>

                    <div >
                        <label className="text-xs">To</label>
                        <CurrencySelect
                            selectedCurrency={toCurrency}
                            handleCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition duration-2000 
                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? "Getting Rate..." : "Get Exchange Rate"}
                </button>

                {result && (
                    <p className="mt-4 p-2 bg-black text-white text-center rounded-md text-sm">
                        {result}
                    </p>
                )}
            </form>
    );
} 