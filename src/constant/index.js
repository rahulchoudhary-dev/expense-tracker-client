export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  USER_PROFILE_URL: "user_profile_url",
  EMAIL: "email",
  REMEMBER_ME: "remember_me",
  THEME: "theme",
  PASSWORD: "password",
};

export const TOAST_MESSAGES = {
  SIGN_IN_SUCCESS: "Signed in successfully",
  SIGN_UP_SUCCESS: "Account created successfully",
  SIGN_OUT_SUCCESS: "Signed out successfully",
  ERROR_GENERIC: "Something went wrong. Please try again.",
  PROFILE_UPDATE_SUCCESS: "Profile updated successfully",
};

export const RADIAN = Math.PI / 180;

export const COLORS = [
  "#a5b4fc",
  "#6ee7b7",
  "#fde68a",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#fcd34d",
];

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
