import * as React from "react";
import { useState } from "react";
import { useIntl } from "react-intl";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { SearchGroupContact } from "api/api";

const SearchGroup = () => {
  const [group, setGroups] = useState([]);

  const Formatted = (param) => {
    return useIntl().formatMessage({ id: param });
  };

  async function searchGroupContact(nickname) {
    try {
      const response = await SearchGroupContact(nickname);
      if (response.data.data.length === 0) {
        return;
      }
      setGroups(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Autocomplete
      options={group}
      getOptionLabel={(option) => option.nickname}
      open={true}
      sx={{
        position: "fixed",
        width: "30%",
        top: "40%",
        left: "43%",
        bgcolor: "#f9f9fa",
      }}
      isOptionEqualToValue={(option, value) =>
        option.nickname === value.nickname
      }
      clearOnBlur={false}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={Formatted("search-group")}
          label={Formatted("search-group")}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchGroupContact(event.target.value);
            }
          }}
        />
      )}
    />
  );
};

export default SearchGroup;
