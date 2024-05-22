import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { Box, TextField, Autocomplete } from "@mui/material";

import { AddGroupContact, SearchGroupContact } from "api/api";
import Query from "components/Query";

const SearchGroup = ({ handleCloseSearch, getGroupContactList }) => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [empty, setEmpty] = useState(true);
  const [openWarn, setOpenWarn] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const Formatted = (param) => {
    return useIntl().formatMessage({ id: param });
  };

  const handleAddGroup = (nickname) => {
    const group = groups.filter((item) => item.nickname === nickname);
    if (!group) {
      return;
    }
    setOpenWarn(true);
    setGroup(group[0]);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
    setGroup({});
  };

  async function searchGroupContact(nickname) {
    if (nickname === "") {
      setGroups([]);
      setEmpty(true);
      return;
    }
    try {
      const response = await SearchGroupContact(nickname);
      if (!response.data.data) {
        setGroups([]);
        return;
      }
      setGroups(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  const addGroupContact = async () => {
    try {
      await AddGroupContact(group.usr_name);
      await getGroupContactList();
      handleCloseWarn();
      handleCloseSearch();
      enqueueSnackbar(<FormattedMessage id="add-group-success" />, {
        variant: "success",
      });
    } catch (err) {
      handleCloseWarn();
      enqueueSnackbar(err.msg, { variant: "error" });
    }
  };

  return (
    <>
      <Box>
        <Autocomplete
          options={groups}
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
          noOptionsText={
            empty
              ? Formatted("search-group-warn")
              : Formatted("no-group-options")
          }
          onInputChange={(_, newValue) => {
            setEmpty(false);
            searchGroupContact(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={Formatted("search-group")}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && groups.length !== 0) {
                  handleAddGroup(event.target.value);
                }
              }}
            />
          )}
        />

        <Query
          open={openWarn}
          title={<FormattedMessage id="add-group" />}
          content={<FormattedMessage id="add-group-warn" />}
          action={addGroupContact}
          handleClose={handleCloseWarn}
        />
      </Box>
    </>
  );
};

export default SearchGroup;
