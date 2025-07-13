const ChartCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl shadow-md bg-white dark:bg-gray-900 p-4">
    {children}
  </div>
);

export default ChartCard;
