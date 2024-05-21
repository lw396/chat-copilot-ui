import { useEffect, useState } from "react";

import {
  Box,
  Chip,
  Fab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { FormattedMessage, useIntl } from "react-intl";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import MainCard from "components/MainCard";
import SearchGroup from "./component/Add";
import ErrorAlert from "components/Alert";

import {
  GroupContactList,
  MessageContentList,
  DeleteMessageContent,
} from "api/api";

const GroupChat = () => {
  const [list, setList] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
  const [openWarn, setOpenWarn] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenWarn = (row) => {
    setCurrentRow(row);
    setOpenWarn(true);
  };

  const handleCloseWarn = () => {
    setOpenWarn(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const getGroupContactList = async () => {
    try {
      const response = await GroupContactList("", 1);
      setList(response.data.data);
    } catch (err) {
      <ErrorAlert content={err} />;
    }
  };

  const Formatted = (param) => {
    return useIntl().formatMessage({ id: param });
  };

  async function getMessageContentList(row) {
    try {
      const response = await MessageContentList(row.user_name, 1);
      console.log(response.data.data);
    } catch (err) {
      return <ErrorAlert content={err}></ErrorAlert>;
    }
  }

  async function deleteMessageContent() {
    try {
      await DeleteMessageContent(currentRow.usr_name);
      handleCloseWarn();
      getGroupContactList();
    } catch (err) {
      return <ErrorAlert content={err}></ErrorAlert>;
    }
  }

  function renderAvatar(params) {
    return <img src={params.value} alt="" width={50} />;
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
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          label={Formatted("view")}
          icon={<InsertCommentIcon />}
          onClick={() => getMessageContentList(params.row)}
        />,
        <GridActionsCellItem
          label={Formatted("delete")}
          icon={<DeleteIcon />}
          onClick={() => handleOpenWarn(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    const getRows = async () => {
      try {
        getGroupContactList();
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
            rows={list}
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
        <Fab
          sx={{ position: "fixed", top: "80%", right: "10%" }}
          color="primary"
          aria-label="add"
          onClick={handleOpenSearch}
        >
          <AddIcon />
        </Fab>

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
            <Button onClick={deleteMessageContent}>
              <FormattedMessage id="confirm" />
            </Button>
            <Button onClick={handleCloseWarn} autoFocus>
              <FormattedMessage id="cancel" />
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth={true} open={openSearch} onClose={handleCloseSearch}>
          <SearchGroup
            handleCloseSearch={handleCloseSearch}
            getGroupContactList={getGroupContactList}
          ></SearchGroup>
        </Dialog>
      </MainCard>
    </>
  );
};

export default GroupChat;
