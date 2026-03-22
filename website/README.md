# Website

This website is built using Docusaurus 2, a modern static website generator.

Run the following commands from the repository root.

### Installation

```
$ vp install
```

### Local Development

```
$ vp run dev
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ vp run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=1 vp run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
