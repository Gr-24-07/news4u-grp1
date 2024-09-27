import ConverterForm from "./ConverterForm";

export default function CurrencyConverter() {
    return (
        <main className="w-60 h-72 mx-auto my-auto bg-green-50">
            <div className=" mx-auto my-auto p-4 rounded-lg outline outline-1">
                <div className="text-center">
                    <h2 className="text-sm font-bold mb-2">Currency Converter</h2>
                    <ConverterForm />
                </div>
            </div>
        </main>
    );
}
