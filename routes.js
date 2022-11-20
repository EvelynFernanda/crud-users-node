const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./src/controllers/UserController");

module.exports = [
  {
    endpoint: "/users",
    method: "GET",
    handler: listUsers,
  },
  {
    endpoint: "/users/:id",
    method: "GET",
    handler: getUserById,
  },
  {
    endpoint: "/users",
    method: "POST",
    handler: createUser,
  },
  {
    endpoint: "/users/:id",
    method: "PUT",
    handler: updateUser,
  },
  {
    endpoint: "/users/:id",
    method: "DELETE",
    handler: deleteUser,
  },
];
