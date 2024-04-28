// material-ui
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import MainCard from "components/MainCard";

import { GroupContactList } from "api/api";
// ==============================|| SAMPLE PAGE ||============================== //

const GroupChat = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
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

  console.log(rows);
  return (
    <>
      <MainCard>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
