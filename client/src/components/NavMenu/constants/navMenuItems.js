export const navMenuItems = (authStatus) => {
  if (authStatus) {
    return [
      { id: 0, icon: "", label: "Products", route: "/" },
      { id: 2, icon: "", label: "logout", route: "logout" },
      { id: 3, icon: "", label: "my-product-edit", route: "my-product-edit" },
      { id: 4, icon: "", label: "about", route: "about" },
      { id: 5, icon: "", label: "Profile", route: "profile" },
    ];
  } else {
    return [
      { id: 0, icon: "", label: "Products", route: "/" },
      { id: 1, icon: "", label: "login", route: "login" },
      { id: 7, icon: "", label: "sign-up", route: "signup" },
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
// ];
