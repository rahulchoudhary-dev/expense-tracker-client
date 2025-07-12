const getCurrentMonthYear = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return { currentMonth, currentYear };
};

export default getCurrentMonthYear;
