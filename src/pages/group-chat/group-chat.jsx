// material-ui
import { useEffect, useState } from "react";

// third-party
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { FormattedMessage } from "react-intl";
import { DataGrid } from "@mui/x-data-grid";

import MainCard from "components/MainCard";

import { GroupContactList, MessageContentList } from "api/api";
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
      const response = await MessageContentList(user_name, 1);
      console.log(response.data.data);
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

        <Dialog
          open={openWarn}
          onClose={handleCloseWarn}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
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
              {" "}
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

  const columns = [
    { field: "id", headerName: "ID", width: 180 },
    {
      field: "head_img_url",
      width: 120,
      sortable: false,
      renderCell: renderAvatar,
      headerName: <FormattedMessage id="avatar" defaultMessage="Avatar" />,
    },
    {
      field: "nickname",
      width: 200,
      headerName: <FormattedMessage id="nickname" defaultMessage="Nickname" />,
    },
    {
      field: "created_at",
      type: "dateTime",
      sortable: false,
      width: 200,
      valueGetter: (params) => new Date(params.value),
      headerName: <FormattedMessage id="createdAt" defaultMessage="CreateAt" />,
    },
    {
      field: "usr_name",
      width: 250,
      sortable: false,
      renderCell: renderActions,
      headerName: <FormattedMessage id="action" defaultMessage="Action" />,
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
