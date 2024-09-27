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
        const API_KEY = "5914c3c816df22348fdea0c6";
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
                        className="border border-gray-300 rounded-md p-2 w-auto h-8 text-xs bg-green-50" 
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
                            className="border border-black rounded-full hover:bg-gray-300 mt-1 p-1"
                            onClick={handleSwapCurrencies}
                        >
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12c0 1.61-.62 3.06-1.63 4.16l1.41 1.41A7.974 7.974 0 0012 20c4.42 0 8-3.58 8-8h3l-5-5-5 5h3c0 3.31-2.69 6-6 6-1.61 0-3.06-.62-4.16-1.63L6 12zm-4 0H2c0-4.42 3.58-8 8-8V1l5 5-5 5V8c-3.31 0-6 2.69-6 6z" fill="#000"/>
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
                    className={`w-full py-2 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition duration-2000 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
