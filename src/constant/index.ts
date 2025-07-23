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
  EXPENSE_UPLOAD_SUCCESS: "Expense and attachment uploaded successfully",
  EXPENSE_UPDATE_SUCCESS: "Expense updated successfully",
  EXPENSE_ADD_SUCCESS: "Expense added successfully",
  EXPENSE_UPLOAD_LOADING: "Uploading expenses...",
};

export const RADIAN = Math.PI / 180;
export const MAX_FILES = 5;

export const COLORS = [
  "#a5b4fc",
  "#6ee7b7",
  "#fde68a",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#fcd34d",
];

// constants.ts
export enum ViewMode {
  TABLE = "table",
  CALENDAR = "calendar",
  BOTH = "both",
}

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
export const COLOR_MAP: Record<
  string,
  { gradient: string; shadow: string; accent: string }
> = {
  "Total Expense": {
    gradient: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600",
    shadow: "shadow-green-500/25",
    accent: "from-emerald-400 to-green-500",
  },
  "Avg Expense": {
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600",
    shadow: "shadow-blue-500/25",
    accent: "from-blue-400 to-indigo-500",
  },
  "This Month": {
    gradient: "bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600",
    shadow: "shadow-yellow-500/25",
    accent: "from-amber-400 to-yellow-500",
  },
  "Top Category": {
    gradient: "bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600",
    shadow: "shadow-purple-500/25",
    accent: "from-purple-400 to-violet-500",
  },
};
