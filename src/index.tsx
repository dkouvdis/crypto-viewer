import { ActionPanel, List, Action, Image } from "@raycast/api";
import { mapListingLatest } from "./lib/dto";
import { preferences } from "./lib/constants";
import { useFetch } from "@raycast/utils";
import { MarkcetCapFull } from "./types";

const { currency } = preferences;

export default function Command() {
  const { data, isLoading } = useFetch<MarkcetCapFull>(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=${currency}`,
    {
      keepPreviousData: true,
    },
  );

  const items = data ? mapListingLatest(data, currency) : [];

  return (
    <List isLoading={isLoading}>
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          subtitle={item.symbol}
          icon={{ source: item.icon, mask: Image.Mask.Circle }}
          accessories={[{ text: item.price }, { tag: item.percentChange }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
