const Card = ({ className, ...props }) => {
  return (
    <svg
      width="58"
      height="40"
      viewBox="0 0 58 40"
      fill="none"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="57" height="39" rx="5.5" fill="white" />
      <rect x="0.5" y="0.5" width="57" height="39" rx="5.5" stroke="#E5E5E5" />
      <path
        d="M20.0049 11H38.0049C38.5572 11 39.0049 11.4477 39.0049 12V28C39.0049 28.5523 38.5572 29 38.0049 29H20.0049C19.4526 29 19.0049 28.5523 19.0049 28V12C19.0049 11.4477 19.4526 11 20.0049 11ZM37.0049 19H21.0049V27H37.0049V19ZM37.0049 17V13H21.0049V17H37.0049ZM31.0049 23H35.0049V25H31.0049V23Z"
        fill="#6366F1"
      />
    </svg>
  );
};

export default Card;
