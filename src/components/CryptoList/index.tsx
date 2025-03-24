import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CryptoCard from "../CryptoCard";
import Style from "./CryptoList.module.css";

interface Crypto {
  id: string;
  name: string;
  current_price: number;
  image: string;
}

const fetchCryptos = async (
  page: number,
  orderBy: string
): Promise<Crypto[]> => {
  const { data } = await axios.get<Crypto[]>(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: { vs_currency: "usd", order: orderBy, per_page: 10, page },
    }
  );
  return data;
};

export default function CryptoList() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("market_cap_desc");

  const { data, error, isLoading } = useQuery<Crypto[], Error>({
    queryKey: ["cryptos", page, orderBy],
    queryFn: () => fetchCryptos(page, orderBy),
  });

  if (isLoading) {
    return (
      <div className={Style.CryptoListContainer}>
        <div className={Style.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={Style.CryptoListContainer}>
        <div className={Style.error}>
          Error {error.name}: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={Style.CryptoListContainer}>
      <div className={Style.header}>
        <h2>Cryptocurrencies</h2>
        <select
          className={Style.select}
          onChange={(e) => setOrderBy(e.target.value)}
          value={orderBy}
        >
          <option value="market_cap_desc">by market cap</option>
          <option value="volume_desc">by volume</option>
          <option value="id_asc">by name (A-Z)</option>
        </select>
      </div>

      <div className={Style.CryptoList}>
        {data?.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            name={crypto.name}
            price={crypto.current_price}
            img={crypto.image}
          />
        ))}
      </div>
      <div className={Style.pagination}>
        <button
          className={Style.paginationButton}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          back
        </button>
        <span>page {page}</span>
        <button
          className={Style.paginationButton}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
}
