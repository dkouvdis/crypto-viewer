import { ActionPanel, List, Image, Action } from "@raycast/api";
import { mapListing } from "./lib/dto";
import { preferences } from "./lib/constants";
import { useFetch } from "@raycast/utils";
import { useState } from "react";

import { Filter, MarkcetCapFull, State } from "./types";

const { currency } = preferences;

export default function Command() {
  const [state, setState] = useState<State>({
    filter: Filter.MarketCap,
  });
  const { data, isLoading } = useFetch<MarkcetCapFull>(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=${currency}`,
    {
      keepPreviousData: true,
    },
  );

  const items = data ? mapListing(data, currency, state.filter) : [];

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Todo List"
          value={state.filter}
          onChange={(newValue) => setState((previous) => ({ ...previous, filter: newValue as Filter }))}
        >
          <List.Dropdown.Item title="Market Cap" value={Filter.MarketCap} />
          <List.Dropdown.Item title="24h %" value={Filter.Change24Hours} />
        </List.Dropdown>
      }
    >
      {items.map((item, index) => (
        <List.Item
          key={index}
          title={item.name}
          subtitle={item.symbol}
          icon={{ source: item.icon, mask: Image.Mask.Circle }}
          accessories={[
            { text: { value: item.price.value, color: item.price.color } },
            { tag: { value: item.percentChange.value, color: item.percentChange.color } },
          ]}
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
