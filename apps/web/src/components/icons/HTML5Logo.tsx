export default function HTML5Logo(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m71 460-41-460h451l-41 460-185 52" fill="#e34f26" />
      <path d="m256 472 149-41 35-394h-184" fill="#ef652a" />
      <path
        d="m256 208h-75l-5-58h80v-56h-142l15 171h127zm-1 147-63-17-4-45h-56l7 89 116 32z"
        fill="#ebebeb"
      />
      <path
        d="m255 208v57h70l-7 73-63 17v59l116-32 16-174zm0-114v56h137l5-56z"
        fill="#fff"
      />
    </svg>
  );
}
