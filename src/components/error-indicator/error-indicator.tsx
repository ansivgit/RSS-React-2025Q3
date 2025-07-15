export const ErrorIndicator = () => (
  <div className="alert alert-danger d-flex align-items-center" role="alert">
    <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
      <use xlinkHref="#exclamation-triangle-fill" />
    </svg>
    <div>An error occurred. Please try again later</div>
  </div>
);
