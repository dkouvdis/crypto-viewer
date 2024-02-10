import { MappedListing, MarkcetCapFull, Filter } from "../types";
import { Color } from "@raycast/api";

const convertedPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(price);

export const mapToColour = (value: number) => {
  return value > 0 ? Color.Green : value < 0 ? Color.Red : Color.SecondaryText;
};

export const mapListing = (
  listing: MarkcetCapFull,
  currency: Preferences["currency"],
  filter: Filter,
): MappedListing => {
  return listing.Data.filter((item) => item.RAW && currency in item.RAW)
    .map((item) => {
      const { CoinInfo, RAW } = item;
      const rawInfo = RAW[currency];

      return {
        name: CoinInfo.FullName,
        symbol: CoinInfo.Name,
        url: `https://www.cryptocompare.com${CoinInfo.Url}/${currency}`,
        icon: `https://www.cryptocompare.com${CoinInfo.ImageUrl}`,
        price: {
          value: convertedPrice(rawInfo.PRICE, currency),
          color: Color.PrimaryText,
          raw: rawInfo.PRICE,
        },
        percentChange: {
          value: `${rawInfo.CHANGEPCT24HOUR.toFixed(2)}%`,
          color: mapToColour(rawInfo.CHANGEPCT24HOUR),
          raw: rawInfo.CHANGEPCT24HOUR,
        },
        marketCap: rawInfo.MKTCAP,
      };
    })
    .sort((a, b) => {
      if (filter === Filter.MarketCap) {
        return b.marketCap - a.marketCap;
      }

      return b.percentChange.raw - a.percentChange.raw;
    });
};
