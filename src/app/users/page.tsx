"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Users from "@/api/apiUsers";
import {
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
  Typography,
  Stack,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import formatDate from "@/functions";
import { renderCellWithStyle } from "@/functions";
import styles from "./usersPage.module.css";

// Загальна функція для рендеру клітинок

// Колонки для таблиці
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, renderCell: renderCellWithStyle },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "last_active",
    headerName: "Last Active",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "last_check_in",
    headerName: "Last Check-In",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "signup_type",
    headerName: "Signup Type",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    renderCell: renderCellWithStyle,
  },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => {
      const userId = params.row.id;
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={`/users/${userId}`} passHref>
            <IconButton>
              <PersonIcon />
            </IconButton>
          </Link>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

const UsersPage = () => {
  const query = useSearchParams();
  const router = useRouter();
  const [pageCount, setPageCount] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filteredUsersCount, setFilteredUsersCount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    _id: "",
    email: "",
    name: "",
    signup_type: "",
    page: "1",
    limit: "5",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Отримання даних
  // Отримання даних
  const fetchUsers = async () => {
    try {
      const currentQuery = new URLSearchParams(window.location.search);
      const data = await Users.getUsers(currentQuery);
      const userList = data.users || [];

      // Форматуємо користувачів
      const formattedUsers = userList.map((user: any) => ({
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        last_active: formatDate(new Date(user.last_active)),
        last_check_in: formatDate(new Date(user.last_check_in)),
        signup_type: user.signup_type,
      }));

      // Оновлюємо стани
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);

      // Оновлюємо кількість відфільтрованих користувачів
      const filteredUsersCount = data.filteredUsersCount || 0;
      setFilteredUsersCount(filteredUsersCount);

      // Ліміт користувачів на сторінку
      const limit = parseInt(searchParams.limit) || 5;
      setTotalUsers(filteredUsersCount); // Оновлюємо загальну кількість користувачів
      setPageCount(
        Math.ceil(filteredUsersCount / parseInt(searchParams.limit))
      ); // Встановлюємо кількість сторінок
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [query, searchParams.page]);

  // Пошук
  // Загальна функція для формування query-строки
  const createQueryParams = (
    params: Record<string, any>,
    additionalParams: Record<string, any> = {}
  ) => {
    return new URLSearchParams(
      Object.entries({ ...params, ...additionalParams }).filter(([_, value]) =>
        Boolean(value)
      )
    );
  };

  // Обробка пошуку (скидає сторінку до 1)
  const handleSearch = () => {
    const queryParams = createQueryParams(searchParams, { page: "1" });

    // Оновлюємо URL
    router.push(`?${queryParams.toString()}`);

    // Оновлюємо стан
    setSearchParams((prev) => ({
      ...prev,
      page: "1",
    }));

    setIsModalOpen(false);
  };

  // Обробка пагінації
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const queryParams = createQueryParams(searchParams, {
      page: value.toString(),
    });

    // Оновлення URL зі всіма фільтрами
    router.push(`?${queryParams.toString()}`);

    // Оновлюємо стан
    setSearchParams((prev) => ({
      ...prev,
      page: value.toString(),
    }));
  };

  const isPaginationVisible = filteredUsersCount > parseInt(searchParams.limit);

  return (
    <div>
      {/* Пошук */}
      <Box className={styles.box}>
        <Typography variant="h6">Search User</Typography>
        <IconButton onClick={() => setIsModalOpen(true)}>
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Таблиця */}

      <DataGrid
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
        rows={filteredUsers}
        columns={columns}
        hideFooter={true}
        disableRowSelectionOnClick
        className={styles.dataGrid}
      />

      {isPaginationVisible && (
        <Stack
          spacing={2}
          sx={{
            alignItems: "flex-end",
            padding: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Pagination
            count={pageCount}
            page={parseInt(searchParams.page)}
            onChange={handlePagination}
          />
        </Stack>
      )}

      {/* Модальне вікно пошуку */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 5,
          }}
        >
          <Typography variant="h6">Users</Typography>
          <TextField
            fullWidth
            label="Search by ID"
            value={searchParams._id || ""}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                _id: e.target.value,
              }))
            }
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Search by email"
            value={searchParams.email || ""}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Search by name"
            value={searchParams.name || ""}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Search by signup type"
            value={searchParams.signup_type || ""}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                signup_type: e.target.value,
              }))
            }
            sx={{ my: 2 }}
          />
          <Button
            sx={{ background: "rgb(173, 70, 255)" }}
            variant="contained"
            fullWidth
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPage;
