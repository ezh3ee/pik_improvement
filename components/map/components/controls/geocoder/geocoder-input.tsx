"use client";

import geocodeAddress from "@/components/map/components/controls/geocoder/actions";
import GeocoderListContainer from "@/components/map/components/controls/geocoder/list-container";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function GeocoderInput() {
  const [address, setAddress] = useState("");

  const [debounced] = useDebounce(address, 700);

  const {
    data: addresses,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["addresses", debounced],
    queryFn: async () => geocodeAddress(debounced),
    enabled: debounced.length > 0,
    retry: false,
  });

  const onSelect = () => {
    setAddress("");
  };

  return (
    <div className="absolute top-2 left-12">
      <Field orientation="horizontal">
        <ButtonGroup>
          <Input
            id="input-button-group"
            placeholder="Поиск по адресу..."
            className="bg-white"
            type="search"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </ButtonGroup>
      </Field>
      {(addresses || isError || isFetching) && (
        <GeocoderListContainer
          addresses={addresses}
          isError={isError}
          isLoading={isFetching}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
