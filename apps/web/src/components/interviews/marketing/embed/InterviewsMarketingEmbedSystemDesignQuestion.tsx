import clsx from 'clsx';
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import gtag from '~/lib/gtag';

import InterviewsPurchasePaywallSmall from '~/components/interviews/purchase/InterviewsPurchasePaywallSmall';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Divider from '~/components/ui/Divider';
import Img from '~/components/ui/Img';
import Prose from '~/components/ui/Prose';
import ScrollArea from '~/components/ui/ScrollArea';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import Text from '~/components/ui/Text';
import { themeBackgroundChipColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

function ReadFullQuestionAlert() {
  const intl = useIntl();

  return (
    <div className="bg-info rounded-md p-4 text-xs">
      <Text className="block" size="body3" weight="medium">
        Like what you are reading?{' '}
        <Anchor
          href={questionMetadata.href}
          target="_blank"
          variant="flat"
          onClick={() => {
            gtag.event({
              action: `homepage.hero.embed.system_design.try_out.click`,
              category: 'engagement',
              label: 'View the full solution and other System Design guides.',
            });
            logEvent('click', {
              element:
                'Homepage System Design questions embed (Try out button)',
              label: 'View the full solution and other System Design guides.',
              namespace: 'interviews',
            });
          }}>
          {intl.formatMessage({
            defaultMessage:
              'View the full solution and other System Design guides.',
            description: 'Button label within embed',
            id: 'eT2mrq',
          })}
        </Anchor>
      </Text>
    </div>
  );
}

function Requirements() {
  return (
    <div>
      <h3>What are the core features to be supported?</h3>
      <ul>
        <li>
          Browse news feed containing posts by the user and their friends.
        </li>
        <li>Liking and reacting to feed posts.</li>
        <li>Creating and publishing new posts.</li>
      </ul>
      <p>
        Commenting and sharing will be discussed further down below but is not
        included in the core scope.
      </p>
      <h3>What kind of posts are supported?</h3>
      <p>
        Primarily text and image-based posts. If time permits we can discuss
        more types of posts.
      </p>
      <h3>What pagination UX should be used for the feed?</h3>
      <p>
        Infinite scrolling, meaning more posts will be added when the user
        reaches the end of their feed.
      </p>
      <h3>Will the application be used on mobile devices?</h3>
      <p>Not a priority, but a good mobile experience would be nice.</p>
    </div>
  );
}

function Architecture() {
  return (
    <div>
      <Img
        alt="News Feed Architecture"
        className="mx-auto w-full max-w-md"
        decoding="async"
        loading="lazy"
        src="/img/questions/news-feed-facebook/news-feed-architecture.png"
      />
      <h3>Component Responsibilities</h3>
      <ul>
        <li>
          <strong>Server</strong>: Provides HTTP APIs to fetch feed posts and to
          create new feed posts.
        </li>
        <li>
          <strong>Controller</strong>: Controls the flow of data within the
          application and makes network requests to the server.
        </li>
        <li>
          <strong>Client Store</strong>: Stores data needed across the whole
          application. In the context of a news feed, most of the data in the
          store will be server-originated data needed by the feed UI.
        </li>
        <li>
          <strong>Feed UI</strong>: Contains a list of feed posts and the UI for
          composing new posts.
          <ul>
            <li>
              <strong>Feed Posts</strong>: Presents the data for a feed post and
              contains buttons to interact with the post (like/react/share).
            </li>
            <li>
              <strong>Post Composer</strong>: WYSIWYG (what you see is what you
              get) editor for users to create new feed posts.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function DataModel() {
  return (
    <div>
      <p>
        A news feed shows a list of posts fetched from the server, hence most of
        the data involved in this application will be server-originated data.
        The only client-side data needed is form state for input fields in the
        post composer.
      </p>
      <table>
        <thead>
          <tr>
            <th>Entity</th>
            <th>Source</th>
            <th>Belongs To</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Feed</code>
            </td>
            <td>Server</td>
            <td>Feed UI</td>
            <td>
              <code>posts</code> (list of <code>Post</code>s),{' '}
              <code>pagination</code> (pagination metadata)
            </td>
          </tr>
          <tr>
            <td>
              <code>Post</code>
            </td>
            <td>Server</td>
            <td>Feed Post</td>
            <td>
              <code>id</code>, <code>created_time</code>, <code>content</code>,{' '}
              <code>author</code> (a <code>User</code>), <code>reactions</code>,{' '}
              <code>image_url</code> (for posts containing images)
            </td>
          </tr>
          <tr>
            <td>
              <code>User</code>
            </td>
            <td>Server</td>
            <td>Client Store</td>
            <td>
              <code>id</code>, <code>name</code>, <code>profile_photo_url</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>NewPost</code>
            </td>
            <td>User input (Client)</td>
            <td>Post Composer UI</td>
            <td>
              <code>message</code>, <code>image</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Although the <code>Post</code> and <code>Feed</code> entities belong to
        the feed post and feed UI respectively, all server-originated data can
        be stored in the client store and queried by the components which need
        them.
      </p>
      <p>
        The shape of the client store is not particularly important here, as
        long as it is in a format that can be easily retrieved from the
        components. New posts fetched from the second page should be joined with
        the previous posts into a single list with the pagination parameters (
        <code>cursor</code>) updated.
      </p>
      <h3>Advanced: Normalized Store</h3>
      <p>
        Both Facebook and Twitter use a normalized client side store. If the
        term "normalized" is new to you, have a read of{' '}
        <Anchor href="https://redux.js.org/usage/structuring-reducers/normalizing-state-shape">
          Redux's documentation on normalizing state shape
        </Anchor>
        . In a nutshell, normalized data stores:
      </p>
      <ul>
        <li>
          Resemble databases where each type of data is stored in its own table.
        </li>
        <li>Each item has a unique ID.</li>
        <li>
          References across data types use IDs (like a foreign key) instead of
          having nested objects.
        </li>
      </ul>
      <p>
        Facebook uses <Anchor href="https://relay.dev">Relay</Anchor> (which can
        normalize the data by virtue of knowing the GraphQL schema) while
        Twitter uses <Anchor href="https://redux.js.org/">Redux</Anchor> as seen
        from the{' '}
        <Anchor href="https://medium.com/statuscode/dissecting-twitters-redux-store-d7280b62c6b1">
          "Dissecting Twitter's Redux Store" blog post
        </Anchor>
        .
      </p>
      <p>The benefits of having a normalized store are:</p>
      <ul>
        <li>
          Reduce duplicated data and have a source of truth for the same piece
          of data that could be presented in multiple instances on the UI. E.g.
          if many posts are by the same author, we're storing duplicated data
          for the <code>author</code> field in the client store.
        </li>
        <li>
          Easily update all data for the same entity. In the scenario that the
          feed post contains many posts authored by the user and the user
          changes their name, it'd be good to be able to immediately reflect the
          updated author name in the posts. This will be easier to do with a
          normalized store than a store that just stores the server response
          verbatim.
        </li>
      </ul>
      <p>
        In the context of an interview, we don't really need to use a normalized
        store for a news feed because:
      </p>
      <ul>
        <li>
          With the exception of the user/author fields, there isn't much
          duplicated data.
        </li>
        <li>
          News feed is mostly for consuming information, there aren't many use
          cases to update data.
          <ul>
            <li>
              Feed user interactions such as liking only affect data within a
              feed post.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Hence the upsides of using a normalized store is limited. In reality,
        Facebook and Twitter websites contain other features, so a normalized
        store is useful in reducing storing of duplicate data and provides the
        ease of making updates.
      </p>
    </div>
  );
}

function Interface() {
  return (
    <div>
      <p>We need the following APIs:</p>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>API Type</th>
            <th>Functionality</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Server</td>
            <td>Controller</td>
            <td>HTTP</td>
            <td>Fetch feed posts</td>
          </tr>
          <tr>
            <td>Controller</td>
            <td>Feed UI</td>
            <td>JavaScript</td>
            <td>Transfer feed posts data, Reactions</td>
          </tr>
          <tr>
            <td>Controller</td>
            <td>Server</td>
            <td>HTTP</td>
            <td>Create new post</td>
          </tr>
          <tr>
            <td>Post Composer</td>
            <td>Controller</td>
            <td>JavaScript</td>
            <td>Transfer new post data</td>
          </tr>
        </tbody>
      </table>
      <p>
        The most interesting API to talk about will be the HTTP API to fetch a
        list of feed posts because the pagination approach is worth a
        discussion. The HTTP API for fetching feed posts from the server has the
        basic details:
      </p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTTP Method</td>
            <td>
              <code>GET</code>
            </td>
          </tr>
          <tr>
            <td>Path</td>
            <td>
              <code>/feed</code>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>Fetches the feed results for a user.</td>
          </tr>
        </tbody>
      </table>
      <p>
        There are two common ways to return paginated content, each with its own
        pros and cons.
      </p>
      <ul>
        <li>Offset-based pagination</li>
        <li>Cursor-based pagination</li>
      </ul>
      <h3>Offset-based Pagination</h3>
      <p>An offset-based pagination API accepts the following parameters:</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>size</code>
            </td>
            <td>number</td>
            <td>Number of results per page</td>
          </tr>
          <tr>
            <td>
              <code>page</code>
            </td>
            <td>number</td>
            <td>Page number to fetch</td>
          </tr>
        </tbody>
      </table>
      <p>
        Given 20 items in a feed, parameters of{' '}
        <code>
          {'{'}size: 5, page: 2{'}'}
        </code>{' '}
        will return items 6 - 10 along with pagination metadata.{' '}
        <Anchor
          href={questionMetadata.href}
          target="_blank"
          onClick={() => {
            gtag.event({
              action: `homepage.hero.embed.system_design.api.see_more.click`,
              category: 'engagement',
              label: 'Read full content...',
            });
            logEvent('click', {
              element: 'Homepage System Design questions embed API tab',
              label: 'Read full content...',
              namespace: 'interviews',
            });
          }}>
          Read full content...
        </Anchor>
      </p>
    </div>
  );
}

function Optimizations() {
  return (
    <div>
      <p>
        As there are a few sections within a news feed application, it will be
        easier to read by focusing on one section at a time and looking at the
        optimizations that can be done for each section:
      </p>
      <ul>
        <li>Feed</li>
        <li>Feed Posts</li>
        <li>Post Composer</li>
      </ul>
      <h3>Feed Optimizations</h3>
      <h4>Rendering Approach</h4>
      <p>
        Traditional web applications have multiple choices on where to render
        the content, whether to render on the server or the client.
      </p>
      <ul>
        <li>
          <strong>Server-side rendering (SSR)</strong>: Rendering the HTML on
          the server side, which is the most traditional way. Best for static
          content that require SEO and does not require heavy user interaction.
          Websites like blogs, documentation sites, e-commerce websites are
          built using SSR.
        </li>
        <li>
          <strong>Client-side rendering (CSR)</strong>: Rendering in the
          browser, by dynamically adding DOM elements into the page using
          JavaScript. Best for interactive content. Applications like
          dashboards, chat apps are built using CSR.
        </li>
      </ul>
      <p>
        Interestingly, news feed applications are somewhere in-between, there's
        a good amount of static content but they also require interaction. In
        reality, Facebook uses a hybrid approach which gives the best of both
        worlds: a fast initial load with SSR then hydrating the page to enable
        interactions. Subsequent content (e.g. more posts added once the user
        reaches the end of their feed) will be rendered via CSR.
      </p>
      <p>
        Modern UI JavaScript frameworks like React and Vue, along with meta
        frameworks like Next.js and Nuxt enable this.
      </p>
      <p>
        <Anchor
          href={questionMetadata.href}
          target="_blank"
          onClick={() => {
            gtag.event({
              action: `homepage.hero.embed.system_design.optimizations.see_more.click`,
              category: 'engagement',
              label: 'Read full content...',
            });
            logEvent('click', {
              element:
                'Homepage System Design questions embed optimizations tab',
              label: 'Read full content...',
              namespace: 'interviews',
            });
          }}>
          Read full content...
        </Anchor>
      </p>
    </div>
  );
}

const questionMetadata: QuestionMetadata = {
  access: 'free',
  author: 'yangshun',
  companies: ['twitter'],
  created: Math.floor(Date.now() / 1000),
  difficulty: 'medium',
  duration: 30,
  excerpt: 'Design a news feed user interface similar to Facebook and Twitter',
  featured: true,
  format: 'system-design',
  frameworkDefault: null,
  frameworks: [],
  href: '/questions/system-design/news-feed-facebook',
  importance: 'high',
  languages: [],
  nextQuestions: [],
  published: true,
  ranking: 1,
  similarQuestions: [],
  slug: 'news-feed-facebook',
  subtitle: null,
  title: 'News Feed (e.g. Facebook)',
  topics: [],
};

export default function InterviewsMarketingEmbedSystemDesignQuestion() {
  const intl = useIntl();
  const [selectedTab, setSelectedTab] = useState('architecture');

  return (
    <div
      aria-hidden={true}
      className="size-full relative isolate flex flex-col">
      <PanelGroup className="h-0 w-full grow lg:flex" direction="horizontal">
        <Panel defaultSize={40} maxSize={60}>
          <ScrollArea>
            <div className="mx-auto h-full max-w-3xl lg:max-w-none">
              <div className="flex flex-col gap-y-4 p-4">
                <Text
                  className="text-base font-semibold sm:text-lg"
                  size="inherit">
                  {intl.formatMessage({
                    defaultMessage: 'Design a News Feed (e.g. Facebook)',
                    description: 'System design question title',
                    id: 'cgTXiW',
                  })}
                </Text>
                <QuestionMetadataSection
                  elements={['author', 'difficulty', 'duration']}
                  metadata={questionMetadata}
                />
                <Divider />
                <div className="flex flex-col gap-y-2">
                  <Text className="block" size="body1" weight="medium">
                    {intl.formatMessage({
                      defaultMessage: 'Companies',
                      description: 'Companies section label',
                      id: '5rd3TN',
                    })}
                  </Text>
                  <InterviewsPurchasePaywallSmall
                    subtitle={intl.formatMessage({
                      defaultMessage:
                        'Purchase premium to see companies which ask this question.',
                      description:
                        'Subtitle for paywall over information about companies that asked the question',
                      id: 'vp4zbB',
                    })}
                    title={intl.formatMessage({
                      defaultMessage: 'Premium Feature',
                      description:
                        'Title for paywall over information about companies that asked the question',
                      id: 'BPE/qv',
                    })}
                  />
                </div>
                <Divider />
                <Prose textSize="sm">
                  <p>
                    Design a news feed application that contains a list of feed
                    posts users can interact with.
                  </p>
                  <Img
                    alt="News Feed Example"
                    className="mx-auto w-full max-w-md"
                    decoding="async"
                    loading="lazy"
                    src="/img/questions/news-feed-facebook/news-feed-example.png"
                  />
                  <div className="contents lg:hidden">
                    <Requirements />
                  </div>
                  <div className="flex flex-col gap-4 lg:hidden">
                    <Divider />
                    <ReadFullQuestionAlert />
                  </div>
                </Prose>
              </div>
            </div>
          </ScrollArea>
        </Panel>
        <PanelResizeHandle
          className={clsx(
            'z-10 -mx-0.5 hidden h-full w-[5px] shrink-0 cursor-col-resize border-x-2 bg-clip-padding transition-colors lg:block',
            themeBackgroundChipColor,
            'hover:bg-brand-light dark:hover:bg-brand',
            'hover:border-brand-light dark:hover:border-brand border-transparent',
            'hidden lg:flex',
          )}
        />
        <Panel className="hidden lg:flex">
          <ScrollArea>
            <div className="flex h-full grow flex-col gap-4 p-4">
              <div>
                <TabsUnderline
                  label="Select solution section"
                  size="sm"
                  tabs={[
                    { label: 'Requirements', value: 'requirements' },
                    { label: 'Architecture', value: 'architecture' },
                    { label: 'Data Model', value: 'data-color-schemel' },
                    { label: 'API', value: 'interface' },
                    { label: 'Optimizations', value: 'optimizations' },
                  ]}
                  value={selectedTab}
                  onSelect={setSelectedTab}
                />
              </div>
              <Prose textSize="sm">
                {selectedTab === 'requirements' && <Requirements />}
                {selectedTab === 'architecture' && <Architecture />}
                {selectedTab === 'data-color-schemel' && <DataModel />}
                {selectedTab === 'interface' && <Interface />}
                {selectedTab === 'optimizations' && <Optimizations />}
                <Divider />
                <ReadFullQuestionAlert />
              </Prose>
            </div>
          </ScrollArea>
        </Panel>
      </PanelGroup>
      <Anchor
        href={questionMetadata.href}
        passHref={true}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.system_design.try_out.click`,
            category: 'engagement',
            label:
              'Click here to view the full solution and other System Design guides.',
          });
          logEvent('click', {
            element: 'Homepage System Design questions embed',
            label:
              'Click here to view the full solution and other System Design guides.',
            namespace: 'interviews',
          });
        }}>
        <Banner size="xs">
          {intl.formatMessage({
            defaultMessage:
              'Click here to view the full solution and other System Design guides.',
            description: 'Button label within embed',
            id: 'thqnR6',
          })}
        </Banner>
      </Anchor>
    </div>
  );
}
