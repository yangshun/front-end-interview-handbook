<!-- Use Ctrl/Cmd + Shift + V in VS Code to preview this Markdown file. -->

# GreatFrontEnd Projects Challenge

Welcome to the GreatFrontEnd Projects platform! Join our [Discord server](https://www.greatfrontend.com/community) and get support from our community ranging from new developers to senior engineers from big tech companies!

This is a starter template for your challenge.

## Getting started

### Overview

At a high level, completing each challenge involves the following steps:

1. Start the challenge from the challenge page.
2. Understand the challenge's functional and visual requirements.
3. Download starter code (optional), reference designs. For the best experience, obtain access to the Figma files.
4. Set up your coding environment and GitHub repository.
5. Develop using your preferred technology stack while referencing the designs, style guides, and any provided guides.
6. Ask for help if necessary.
7. Upon completion, review your work.
8. Deploy your work on available hosting platforms.
9. Submit your work and share it with the world!

### Starter code

This starter template consists of the following files and directories:

```bash
├── README.md
├── css
│   └── style.css
├── designs
├── img
├── index.html
└── js
    └── index.js
```

- `README.md`: This file.
- `designs`: Responsive design images for the challenge. Your submission will be compared against some or all of these images.
- `index.html`: Entrypoint for your website. You should be editing this file.
- `css`: For writing any custom CSS styles to customize the appearance of the page.
- `js`: For writing any custom JavaScript to add interactivity to the page.
- `img`: Image assets used by the challenge.

### Provided assets

For each challenge, we provide the following assets:

- **Starter/skeleton code**: `index.html`, `style.css`, and `index.js`.
- **Designs**: The `designs` directory contains reference image design files for the various device breakpoints and states for the challenge. With only these images, it can be hard to determine the exact styling required, so `style-guide.md` contains valuable information about the design, such as device breakpoints, typography styles, and color palette.
- **Images**: If the challenge uses some images such as illustrations, logos, etc, they will be provided in the `img` directory.
- **Icons**: Icons can be found on [Remix Icon](https://remixicon.com/).

For the best (and realistic) experience, we recommend developing while referencing the challenge's Figma file. If the challenge is free or you have a [GreatFrontEnd Projects Premium](https://greatfrontend.com/projects/pricing) subscription, you'd be able to download the challenge's `.fig` Figma file, which will allow you to emulate developers at work – inspecting high fidelity designs and diving into each element's properties like colors, font sizes, spacing, etc.

### Using Figma files

The downloaded `.fig` file can be opened using the [Figma website](https://www.figma.com/) or [desktop app](https://www.figma.com/downloads/). By inspecting the Figma file, you will be able to build as closely as possible to the design.

If you are new to Figma, here are some useful resources to help you get acquainted with Figma:

- [Intro to Figma for Developers by Scrimba](https://www.youtube.com/watch?v=fZ-OU_7aBv4)
- [Figma Onboarding Kit for Developers](https://www.figma.com/community/file/1202517341060356377)
- [Figma 101 for Developers](https://www.figma.com/community/file/1199577674592933191)

As a developer, you do not have to learn how to create designs with Figma; you primarily have to know how to navigate a file, selecting frames, inspect properties of the elements such as their size, color, spacing, typography, etc.

## Working on the challenge

### Using GitHub for storing code with version control

We will be using [GitHub](https://www.github.com/) to store your challenge code as it is the best place for developers to build up their coding portfolio. Many other developer-related services integrate with GitHub as well. If it's your first time using Git/GitHub, refer to [GitHub's beginner documentation](https://docs.github.com/en/get-started/getting-started-with-git).

There are two common ways to go about developing the challenges:

1. **Code first, GitHub repo later**: Jump right into developing your code. After you're done, set up a GitHub repository and push your code to the repo. If it's your first time doing a challenge and it is a small one, this approach might be more convenient.
2. **GitHub repo first, code later**: For more complex and longer-term projects, it will be more advisable to set up a GitHub repository first and commit to the repository often so as to have better version control. **This is the recommended approach.**

### Developing the challenge

Out-of-the-box, our starter templates help you get started with the challenges using vanilla HTML, CSS, and JavaScript. The easiest way to start developing is to open the `index.html` file using an IDE (Integrated Development Editor) like [VS Code](https://code.visualstudio.com/) and start changing the code. To preview the result, open `index.html` using a web browser. Remember to refresh the browser to see any updates!

That said, you are free to choose a technology stack as you deem fit – React, Next.js, Vite, Vue, you name it. Where relevant and possible, you can integrate these libraries into the starter template.

You can even use the recommended starter code provided by your chosen tech stack but you will be in-charge of adding necessary code for CSS resets, copying any provided image assets over and importing the challenge font. There aren't a lot of them, so you can poke around the starter code files and easily identify what to copy into your custom setup.

Here's a basic outline of the process of converting a design image into front end code:

1. **Study the design**: Examine the design images / Figma files with the aim of understanding the layout, components, typography, colors, interactions and any responsive design requirements for different screen sizes. Be sure to also cross check with the provided style guide.
2. **HTML structure**: Plan the HTML structure of the challenge based on the design. Use semantic HTML elements such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
3. **CSS styling**: Apply CSS styling to the HTML elements to match the visual design. Use CSS classes to set font styles, sizes, colors, margins, paddings, borders, and backgrounds while referring to the design, style guide, and Figma file.
4. **Responsive design**: Implement responsive design techniques to ensure the website looks and functions well on different devices and screen sizes. Use media queries to adjust layout, font sizes, and other styling properties as needed for various breakpoints.
5. **Interactivity and JavaScript**: Implement any interactive features or animations using JavaScript or front end frameworks like React or Vue.js.

### Getting help

It is common to get stuck while working on a challenge especially when it touches on unfamiliar topics or techniques. To get help, you can leverage the following:

1. **Read the provided guides**: Our guides contain common problems people faced for the challenge and we offer resources and solutions to unblock yourself.
2. **Leverage the challenge forum**: Use the "Discussions" tab for the challenge to either look at questions asked by others or ask your own question.
3. **GreatFrontEnd community**: Join the [Discord community](https://www.greatfrontend.com/community) and get real-time support from the community.
4. **[ChatGPT](https://chat.openai.com/)**: ChatGPT is great for answering common and introductory level questions. You can even send your code to ChatGPT for it to comment on.

## Completing

Well done completing the development! We're sure it looks fantastic, but before you put it up for the world to see, there are a few more things that should be done.

### Review

A good developer reviews their work during development, and definitely before deploying. Perform the following basic checks:

1. **Code formatting**: Code formatting usually does not affect the end result of the website, but it helps make your code maintainable. Tools like [Prettier](https://prettier.io/) come in handy here. If you are using [VS Code](https://code.visualstudio.com/), do "Right click" -> "Format document" to format the file using the default formatters.
2. **Test for responsiveness**: Check your website's responsiveness on different devices and screen sizes, including desktops, laptops, tablets, and smartphones. Verify that the layout adjusts smoothly and all content remains accessible and readable.
3. **Check for content accuracy**: Review all text content, images, and multimedia elements to ensure accuracy, relevance, and proper formatting. Verify that there are no spelling or grammatical errors.

These checks are non-exhaustive! The list goes on and the more complex your product is, the more things you should check for.

### Deploy your site

Deployment is the process of putting your website's code onto publicly-accessible web servers so that anyone in the world can visit your website.

We recommend the following hosting providers where you can deploy your website for free:

- [GitHub Pages](https://pages.github.com/): If you are using the default starter code template hosted on a public GitHub repository, this is the easiest and fastest way to get your site deployed.
- [Vercel](https://www.vercel.com/): Vercel offers a one-click deployment experience just by connecting your GitHub repository and they have a generous free tier. Could be overkill for hosting static files that don't require a build step.
- [Netlify](https://www.netlify.com/): Similar offerings as Vercel.

### Submission

Before submitting, ensure the following:

1. **Your GitHub repository is public**. This allows the community to view your code and comment on it on your submission page.
2. **Your completed challenge is hosted on a publicly-accessible URL**. This is important because we take screenshots of your website using various device breakpoints / screen widths and allow you to compare the differences between your implementation and the designs.

Then head to the challenge page where you will find a "Submit" button. Clicking on the button leads you to a submit page where you can fill in additional details about your process. After the submission form is filled, you will be brought to your submission page and get points for completing the challenge!

## Next steps

Congratulations on submitting your completed challenge! 🚀 Here are some possible next steps you can take:

1. **Start on a [new challenge](https://www.greatfrontend.com/projects/challenges)**: Most challenges use the same design system, and you will find that you can reuse some of the styles and components you have built in past challenges.
2. **Show off your solution to the community**: Post a link to your completed challenge in the [Discord community](https://www.greatfrontend.com/community).
3. **Share your solution on your social media accounts**: Share your achievements to your network by adding screenshots of your completed challenge and links to the live websites. Do mention us (@GreatFrontEnd on LinkedIn, Instagram, and Twitter/X), we'd love to see what you have built!
4. **Write about your development process**: Platforms like [DEV Community](https://dev.to), [Hashnode](https://hashnode.com/), [Medium](https://medium.com/), and [HackerNoon](https://hackernoon.com/) are great for writing technical content to build your online presence and reinforce your understanding.

## Have questions or feedback?

At GreatFrontEnd projects, we greatly value receiving feedback as it helps us continuously improve and refine our products/services to better meet the needs and expectations of our customers and stakeholders. If you have any feedback or questions, the best channels to reach out would be our [Discord community](https://www.greatfrontend.com/community), our [LinkedIn Page](https://www.linkedin.com/company/greatfrontend), or send an email to contact@greatfrontend.com.

🔥 Good luck on your Front End Developer journey! 🔥
