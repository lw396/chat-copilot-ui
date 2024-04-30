// material-ui
import { useEffect, useState } from "react";

// third-party
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { FormattedMessage, useIntl } from "react-intl";
import { DataGrid } from "@mui/x-data-grid";

import MainCard from "components/MainCard";

import {
  GroupContactList,
  MessageContentList,
  DeleteMessageContent,
} from "api/api";
// ==============================|| SAMPLE PAGE ||============================== //

const GroupChat = () => {
  const [rows, setRows] = useState([]);
  const [openWarn, setOpenWarn] = useState(false);

  const handleClickOpenWarn = () => {
    setOpenWarn(true);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const Formatted = (param) => {
    return useIntl().formatMessage({ id: param });
  };

  async function getMessageContentList(user_name) {
    try {
      const response = await MessageContentList(user_name, 1);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteMessageContent(user_name) {
    try {
      await DeleteMessageContent(user_name);
      handleCloseWarn();
      const response = await GroupContactList("", 1);
      setRows(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  function renderAvatar(params) {
    return <img src={params.value} alt="" width={50} />;
  }

  function renderActions(params) {
    return (
      <>
        <Button
          style={{ marginRight: 16 }}
          size="small"
          variant="contained"
          onClick={() => getMessageContentList(params.value)}
        >
          <FormattedMessage id="view" />
        </Button>
        <Button
          style={{ marginRight: 16 }}
          size="small"
          variant="contained"
          onClick={handleClickOpenWarn}
        >
          <FormattedMessage id="delete" />
        </Button>

        <Dialog fullWidth={true} open={openWarn} onClose={handleCloseWarn}>
          <DialogTitle id="alert-dialog-title">
            <FormattedMessage id="warn" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage id="delete-confirm" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteMessageContent(params.value)}>
              <FormattedMessage id="confirm" />
            </Button>
            <Button onClick={handleCloseWarn} autoFocus>
              <FormattedMessage id="cancel" />
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  function renderChip(params) {
    const statusDictionary = {
      1: {
        value: Formatted("normal"),
        color: "primary",
      },
      0: {
        value: Formatted("disable"),
        color: "error",
      },
    };
    return (
      <Chip
        label={statusDictionary[params.value].value}
        color={statusDictionary[params.value].color}
        variant="outlined"
      />
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "head_img_url",
      width: 200,
      sortable: false,
      renderCell: renderAvatar,
      headerName: Formatted("avatar"),
    },
    {
      field: "nickname",
      width: 200,
      headerName: Formatted("nickname"),
    },
    {
      field: "status",
      width: 200,
      renderCell: renderChip,
      headerName: Formatted("status"),
    },
    {
      field: "created_at",
      type: "dateTime",
      sortable: false,
      width: 200,
      valueGetter: (params) => new Date(params.value),
      headerName: Formatted("createdAt"),
    },
    {
      field: "usr_name",
      width: 200,
      sortable: false,
      renderCell: renderActions,
      headerName: Formatted("action"),
    },
  ];

  useEffect(() => {
    const getRows = async () => {
      try {
        const response = await GroupContactList("", 1);
        setRows(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getRows();
  }, []);

  return (
    <>
      <MainCard>
        <Box sx={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={60}
            sx={{ m: 2 }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </MainCard>
    </>
  );
};

export default GroupChat;
