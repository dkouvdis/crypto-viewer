import { MappedListing, MarkcetCapFull } from "../types";
import { Color } from "@raycast/api";

const convertedPrice = (price: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(price);

export const mapToColour = (value: number) => {
  return value > 0 ? Color.Green : value < 0 ? Color.Red : Color.SecondaryText;
};

export const mapListingLatest = (listing: MarkcetCapFull, currency: Preferences["currency"]): MappedListing => {
  return listing.Data.map((item) => {
    const { CoinInfo, RAW } = item;
    const rawInfo = RAW && currency in RAW ? RAW[currency] : null;

    return {
      name: CoinInfo.FullName,
      symbol: CoinInfo.Name,
      url: `https://www.cryptocompare.com${CoinInfo.Url}`,
      icon: `https://www.cryptocompare.com${CoinInfo.ImageUrl}`,
      price: {
        value: rawInfo?.PRICE ? convertedPrice(rawInfo.PRICE, currency) : "N/A",
        color: Color.PrimaryText,
      },
      percentChange: {
        value: rawInfo?.CHANGEPCT24HOUR ? `${rawInfo.CHANGEPCT24HOUR.toFixed(2)}%` : "N/A",
        color: rawInfo?.CHANGEPCT24HOUR ? mapToColour(rawInfo.CHANGEPCT24HOUR) : Color.SecondaryText,
      },
    };
  }).filter(Boolean);
};
