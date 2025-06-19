export default function JobPosting({
  url,
  by,
  time,
  title,
}) {
  return (
    <div className="post" role="listitem">
      <h2 className="post__title">
        {url ? (
          <a href={url} target="_blank" rel="noopener">
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      <p className="post__metadata">
        By {by} &middot;{' '}
        {new Date(time * 1000).toLocaleString()}
      </p>
    </div>
  );
}
