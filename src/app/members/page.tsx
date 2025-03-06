"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Members from "@/api/apiMembers";
import {
  Box,
  IconButton,
  Modal,
  Pagination,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { renderCellWithStyle } from "@/functions";

interface Member {
  _id: string;
  userName: string;
  email: string;
  role: string;
}

const MembersPage = () => {
  const router = useRouter();
  const query = useSearchParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [modalData, setModalData] = useState<Member | null>(null);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [searchParams, setSearchParams] = useState({
    page: "1",
    limit: "5",
  });

  const fetchMembers = async (params = searchParams) => {
    try {
      const queryParams = createQueryParams(params);
      const data = await Members.getMembers(queryParams);
      setMembers(data.members || []);
      setTotalMembers(data.count || 0);
      setPageCount(Math.ceil((data.count || 0) / parseInt(params.limit)));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [searchParams]);

  const createQueryParams = (params: Record<string, string>) => {
    return new URLSearchParams(
      Object.entries(params).filter(([_, value]) => Boolean(value))
    );
  };

  const handlePagination = (_: any, value: number) => {
    const updatedParams = { ...searchParams, page: value.toString() };
    setSearchParams(updatedParams);
    fetchMembers(updatedParams);
    router.push(`?${createQueryParams(updatedParams).toString()}`);
  };

  const handleEditClick = (member: Member) => {
    setModalData(member);
  };

  const handleSave = async () => {
    if (!modalData) return;

    const updateData: any = {
      userName: modalData.userName,
      email: modalData.email,
      role: modalData.role,
    };

    if (passwords.newPassword) {
      updateData.newPassword = passwords.newPassword;
      if (passwords.oldPassword) {
        updateData.password = passwords.oldPassword;
      }
    }

    try {
      await Members.updateMember(modalData._id, updateData);
      setModalData(null);
      setPasswords({ oldPassword: "", newPassword: "" });
      fetchMembers();
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: renderCellWithStyle,
    },
    {
      field: "userName",
      headerName: "Name",
      flex: 1,
      renderCell: renderCellWithStyle,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: renderCellWithStyle,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: renderCellWithStyle,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/members/${params.row._id}`} passHref>
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <DriveFileRenameOutlineIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={members}
        columns={columns}
        getRowId={(row) => row._id}
        hideFooter={true}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within,& .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },

          "& .MuiDataGrid-cell": {
            textAlign: "center",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      />
      {totalMembers > parseInt(searchParams.limit) && (
        <Stack spacing={2} sx={{ alignItems: "flex-end", padding: 2 }}>
          <Pagination
            count={pageCount}
            page={parseInt(searchParams.page)}
            onChange={handlePagination}
          />
        </Stack>
      )}
      {modalData && (
        <Modal open={!!modalData} onClose={() => setModalData(null)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 5,
              borderRadius: 8,
              minWidth: 800,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Member
            </Typography>

            <Typography variant="h6">Edit name</Typography>
            <TextField
              fullWidth
              value={modalData.userName}
              onChange={(e) =>
                setModalData({ ...modalData, userName: e.target.value })
              }
              sx={{ mb: 2 }}
              autoComplete="off"
            />

            <Typography variant="h6">Edit email</Typography>
            <TextField
              fullWidth
              value={modalData.email}
              onChange={(e) =>
                setModalData({ ...modalData, email: e.target.value })
              }
              sx={{ mb: 2 }}
              autoComplete="off"
            />

            <Typography variant="h6">Edit role</Typography>
            <TextField
              fullWidth
              value={modalData.role}
              onChange={(e) =>
                setModalData({ ...modalData, role: e.target.value })
              }
              sx={{ mb: 2 }}
              autoComplete="off"
            />
            <Typography variant="h6">Edit password</Typography>
            <Typography variant="body2">Old password</Typography>
            <TextField
              fullWidth
              type="password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              sx={{ mb: 2 }}
              autoComplete="new-password"
            />

            <Typography variant="body2">New password</Typography>
            <TextField
              fullWidth
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              sx={{ mb: 2 }}
              autoComplete="new-password"
            />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "rgb(173, 70, 255)",
                "&:hover": {
                  bgcolor: "rgb(150, 60, 230)", // змінює колір при наведенні
                },
                width: "100%",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MembersPage;
