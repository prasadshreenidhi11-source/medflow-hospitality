import "./StatCard.css";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
  badge,
  badgeType = "positive",
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon ${color}`}>
          <Icon size={21} />
        </div>

        {badge && (
          <span className={`stat-change ${badgeType}`}>
            {badge}
          </span>
        )}
      </div>

      <p className="stat-title">{title}</p>

      <h3 className="stat-value">{value}</h3>

      <span className="stat-description">
        {description}
      </span>
    </div>
  );
}

export default StatCard;
