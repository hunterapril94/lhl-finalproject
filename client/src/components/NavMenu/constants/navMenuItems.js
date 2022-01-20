import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
export const navMenuItems = (authStatus) => {
  if (authStatus) {
    return [
      { id: 0, icon: <SearchIcon />, label: "Products", route: "/" },
      {
        id: 3,
        icon: <Inventory2Icon />,
        label: "My Products",
        route: "my-products",
      },
      // { id: 4, icon: "", label: "about", route: "about" },

      {
        id: 8,
        icon: <ArrowUpwardIcon />,
        label: "My Lent Items",
        route: "my-lent-items",
      },
      {
        id: 9,
        icon: <ArrowDownwardIcon />,
        label: "My Borrowed Items",
        route: "my-borrowed",
      },
      {
        id: 10,
        icon: <PendingActionsIcon />,
        label: "Pending Requests",
        route: "my-requests",
      },
      {
        id: 7,
        icon: <ReceiptLongIcon />,
        label: "Transaction History",
        route: "my-completed-transactions",
      },
      { id: 5, icon: <AccountBoxIcon />, label: "Profile", route: "profile" },
      { id: 2, icon: <LogoutIcon />, label: "logout", route: "logout" },
    ];
  } else {
    return [
      { id: 0, icon: "", label: "Products", route: "/" },
      { id: 1, icon: "", label: "login", route: "login" },
      { id: 6, icon: "", label: "sign-up", route: "signup" },
    ];
  }
};

// export const navMenuItems = [
//   { id: 0, icon: "", label: "Products", route: "/" },
//   { id: 1, icon: "", label: "login", route: "login" },
//   { id: 2, icon: "", label: "logout", route: "logout" },
//   { id: 3, icon: "", label: "my-product-edit", route: "my-product-edit" },
//   { id: 4, icon: "", label: "about", route: "about" },
//   { id: 5, icon: "", label: "Profile", route: "profile" },
//   { id: 6, icon: "", label: "sign-up", route: "signup" },
//   { id: 7, icon: "", label: "Completed Treansactions", route: "my-completed-transactions" },
//   { id: 8, icon: "", label: "My Lent Items", route: "my-lent-items" }
//   { id: 9, icon: "", label: "My Borrowed Items", route: "my-borrowed" }
//   { id: 10, icon: "", label: "Pending Requests", route: "my-requests" },
// ];
