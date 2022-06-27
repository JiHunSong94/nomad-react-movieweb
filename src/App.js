import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usdexs, setUsdexs] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    )
      .then((response) => response.json())
      .then((json) => {
        setUsdexs(json);
        setLoading(false);
      });
  });
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}):(${coin.quotes.USD.price}USD))
            </option>
          ))}
        </select>
      )}
      <ul>
        {usdexs.map((usdex) => (
          <li>
            {usdex.date}
            {usdex.name}
            {usdex.basePrice}원
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
