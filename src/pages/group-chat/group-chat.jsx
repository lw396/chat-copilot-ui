import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useSnackbar } from "notistack";

import { Box, Chip, Fab, Dialog } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import MainCard from "components/MainCard";
import Query from "components/Query";
import SearchGroup from "./component/Add";

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
  const [total, setTotal] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

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
      setList(response.data.data.list);
      console.log(response.data.data.total);
      setTotal(response.data.data.total);
    } catch (err) {
      enqueueSnackbar(err.msg, { variant: "error" });
    }
  };

  const Formatted = (param) => {
    return useIntl().formatMessage({ id: param });
  };

  async function getMessageContentList(row) {
    try {
      const response = await MessageContentList(row.usr_name, 1);
      console.log(response.data.data);
    } catch (err) {
      return enqueueSnackbar(err.msg, { variant: "error" });
    }
  }

  async function deleteMessageContent() {
    try {
      await DeleteMessageContent(currentRow.usr_name);
      handleCloseWarn();
      getGroupContactList();
    } catch (err) {
      enqueueSnackbar(err.msg, { variant: "error" });
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
      width: 180,
      sortable: false,
      renderCell: renderAvatar,
      headerName: Formatted("avatar"),
    },
    {
      field: "nickname",
      width: 250,
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
    getGroupContactList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            rowCount={total}
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

        <Query
          open={openWarn}
          title={<FormattedMessage id="warn" />}
          content={<FormattedMessage id="delete-confirm" />}
          action={deleteMessageContent}
          handleClose={handleCloseWarn}
        />

        <Dialog fullWidth={true} open={openSearch} onClose={handleCloseSearch}>
          <SearchGroup
            handleCloseSearch={handleCloseSearch}
            getGroupContactList={getGroupContactList}
          />
        </Dialog>
      </MainCard>
    </>
  );
};

export default GroupChat;
