let users = [];

const addUser = (user) => {
  users.push(user);
  return user;
};

const findUserById = (userId) => {
  return users.find(u => u.id === userId);
};

const updateUserForms = (userId, formType, formData) => {
  const user = findUserById(userId);
  if (user) {
    user.forms = user.forms || {};
    user.forms[formType] = formData;
  }
  return user;
};

module.exports = {
  users,
  addUser,
  findUserById,
  updateUserForms
}; 