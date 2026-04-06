type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  titleSize?: string;
};

const PageHeader = ({ title, subtitle, action, titleSize = "text-2xl" }: PageHeaderProps) => {
  return (
    <div className="border-b border-white/8 p-4">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className={`font-bold text-white leading-tight ${titleSize}`}>{title}</h1>
            {subtitle && (
              <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
