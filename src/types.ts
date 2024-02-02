import { Color } from "@raycast/api";

type Data = {
  CoinInfo: {
    Name: string;
    FullName: string;
    Url: string;
    ImageUrl: string;
  };
  RAW: Record<
    Preferences["currency"],
    {
      PRICE: number;
      CHANGEPCT24HOUR: number;
      CHANGE24HOUR: number;
    }
  >;
};

export type MarkcetCapFull = {
  Message: string;
  Type: number;
  Data: Data[];
};

export type MappedListing = {
  name: string;
  symbol: string;
  url: string;
  icon: string;
  price: {
    value: string;
    color: Color;
  };
  percentChange: {
    value: string;
    color: Color;
  };
}[];
