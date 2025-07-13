interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h1>
      {subtitle && (
        <span className="text-base font-normal dark:text-gray-200">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
