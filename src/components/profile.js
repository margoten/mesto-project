export let currentUser = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
  cohort: "",
};

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const isCurrentUserContains = (users) => {
  return users.some((user) => isCurrentUser(user));
};

export const isCurrentUser = (user) => {
  return currentUser._id === user._id;
};
