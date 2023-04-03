// TODO: Using 100dvh fixes the problem of submit buttons not appear on iPad,
// but we faced issues with poor browser support especially Safari.
// Change back to 100dvh in future when it's more widely supported.
const footerlessContainerHeight = `calc(100vh - var(--navbar-height))`;

export default footerlessContainerHeight;
