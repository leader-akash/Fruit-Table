import { useState } from "react";
import "./App.css";
import { fruitData } from "./data";

function App() {
  const [data, setData] = useState(fruitData);
  const [editing, setEditing] = useState({});

  const calculateTotal = (month) => {
    return data.reduce((total, fruitData) => total + fruitData.prices[month], 0).toFixed(2);
  };

  const handlePriceChange = (fruit, month, newPrice) => {
    setEditing((prev) => ({
      ...prev,
      [fruit]: {
        ...prev[fruit],
        [month]: newPrice,
      },
    }));
  };

  const handleEdit = (fruit) => {
    setEditing({
      [fruit]: { ...data.find((item) => item.fruit === fruit).prices },
    });
  };

  const handleSave = (fruit) => {
    setData((prev) =>
      prev.map((item) =>
        item.fruit === fruit
          ? {
              ...item,
              prices: editing[fruit],
            }
          : item
      )
    );
    setEditing({});
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Fruit Prices Table</h2>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Fruit</th>
            {Object.keys(data[0].prices).map((month) => (
              <th key={month} className="border border-gray-300 px-4 py-2">
                {month}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fruitData) => (
            <tr key={fruitData.fruit}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{fruitData.fruit}</td>
              {Object.entries(fruitData.prices).map(([month, price]) => (
                <td key={month} className="border border-gray-300 px-4 py-2">
                  {editing[fruitData.fruit] ? (
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-2 py-1 border rounded"
                      value={editing[fruitData.fruit][month]}
                      onChange={(e) =>
                        handlePriceChange(fruitData.fruit, month, parseFloat(e.target.value))
                      }
                    />
                  ) : (
                    price
                  )}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                {editing[fruitData.fruit] ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSave(fruitData.fruit)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(fruitData.fruit)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}

          <tr className="bg-gray-100 font-bold">
            <td className="border border-gray-300 px-4 py-2">Total</td>
            {Object.keys(data[0].prices).map((month) => (
              <td key={month} className="border border-gray-300 px-4 py-2">
                {calculateTotal(month)}
              </td>
            ))}
            <td className="border border-gray-300 px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

