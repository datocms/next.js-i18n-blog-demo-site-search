<!--datocms-autoinclude-header start-->

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60"></a>

👉 [Visit the DatoCMS homepage](https://www.datocms.com) or see [What is DatoCMS?](#what-is-datocms)

---

<!--datocms-autoinclude-header end-->

# A multi-language blog example using Next.js and DatoCMS

This example showcases a Next.js multi-language blog using [DatoCMS](https://www.datocms.com/) as the data source. It fully supports [Preview Mode](https://www.datocms.com/docs/next-js/setting-up-next-js-preview-mode) with [DatoCMS real-time updates](https://www.datocms.com/docs/next-js/real-time-updates) as well as [DatoCMS SiteSearch](https://www.datocms.com/docs/site-search)  used to index and display the posts searched by the user.

The purpose of this repo is to have a quick start reference that can be set up with the "one-click" button below. This is what the end result looks like:
#### [https://next-js-i18n-blog-demo-with-sitesearch.vercel.app/](https://next-js-i18n-blog-demo-with-sitesearch.vercel.app/)

## How to use

### Quick start

1. [Create an account on DatoCMS](https://datocms.com).

2. Make sure that you have set up the [Github integration on Vercel](https://vercel.com/docs/git/vercel-for-github).

3. Let DatoCMS set everything up for you clicking this button:

  [![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/next.js-i18n-blog-demo-site-search)

### Local setup

Once the setup of the project and repo is done, clone the repo locally.

#### Set up environment variables

In your DatoCMS' project, go to the **Settings** menu at the top and click **API tokens**.

Create two DatoCMS API tokens: `CDA Only (Published)` and `CDA Only (Draft)`.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable on `.env`:

- `DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN` should be the `CDA Only (Published)` token.
- `DATOCMS_DRAFT_CONTENT_CDA_TOKEN` should be the `CDA Only (Draft)` token.
- `NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET`. Set this for private deployments. If it is set, Preview Mode only opens when the query string `secret` matches it.
- `NEXT_EXAMPLE_CMS_DATOCMS_PUBLIC_PREVIEW` should be set to `true` only for public demo deployments that should let anyone enter Preview Mode. Leave it empty for private deployments.
- If `NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET` is set, the `secret` query string must match it, even when public preview is enabled. If it is unset, Preview Mode opens only when `NEXT_EXAMPLE_CMS_DATOCMS_PUBLIC_PREVIEW=true`.
- `NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH` should be the SiteSearch API token on your project
- `NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID` should be the numerical string on the URL of the Build trigger associated with the project

Your `.env` file should look like this:

```bash
DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN=...
DATOCMS_DRAFT_CONTENT_CDA_TOKEN=...
NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET=...
NEXT_EXAMPLE_CMS_DATOCMS_PUBLIC_PREVIEW=
NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH=...
NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID=...
```

#### Run your project locally

```bash
npm install
npm run dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

#### Try preview mode

On DatoCMS, go to one of the posts you've created and:

- **Update the title**. For example, you can add `[Draft]` in front of the title.
- Click **Save**, but **DO NOT** click **Publish**. By doing this, the post will be in the draft state.

(If it doesn't become draft, you need to go to the model settings for `Post`, go to **Additional Settings**, and turn on **Enable draft/published system**.)

Now, if you go to the post page on localhost, you won't see the updated title. However, if you use the **Preview Mode**, you'll be able to see the change ([Documentation](https://www.datocms.com/docs/next-js/setting-up-next-js-preview-mode)).

To enable the Preview Mode, go to this URL:

```
http://localhost:3000/api/preview?secret=<secret>
```

- `<secret>` should be the string you entered for `NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET`. Public demo deployments can omit this only when `NEXT_EXAMPLE_CMS_DATOCMS_PUBLIC_PREVIEW=true`.
- `<slug>` should be the post's `slug` attribute (you can check on DatoCMS).

You should now be able to see the updated title. To exit the preview mode, you can click **Click here to exit preview mode** at the top.

<!--datocms-autoinclude-footer start-->

---

# What is DatoCMS?

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60" alt="DatoCMS - The Headless CMS for the Modern Web"></a>

[DatoCMS](https://www.datocms.com/) is Headless CMS for the modern web. Trusted by 25,000+ businesses, agencies, and individuals, it gives your team one place to manage content and ship it to any website, app, or device via API.

**New here?** Start with [Create free account](https://dashboard.datocms.com/signup) and the [Documentation](https://www.datocms.com/docs). Stuck? Ask the [Community](https://community.datocms.com/). Curious what's new? [Product Updates](https://www.datocms.com/product-updates).

**Building with AI:** [Agent Skills](https://www.datocms.com/docs/agent-skills) turn coding assistants (Claude Code, Cursor) into expert DatoCMS developers, with full read/write via the auto-installed CLI. No local terminal? Use the [MCP Server](https://www.datocms.com/docs/mcp-server) instead.

**Talking to DatoCMS from code:**
- [Content Delivery API](https://www.datocms.com/docs/content-delivery-api) (CDA) — the fast, read-only GraphQL API your website/app uses to **fetch** published content.
- [Content Management API](https://www.datocms.com/docs/content-management-api) (CMA) — the REST API for **creating and updating** content, models, and project settings (think scripts, migrations, integrations).
- [CLI](https://www.datocms.com/docs/scripting-migrations/installing-the-cli) — terminal tool for schema migrations and importing from Contentful/WordPress.

**Framework guides:** end-to-end recipes for fetching content, rendering Structured Text, optimizing images/video, handling SEO, and setting up live preview with visual editing in [Next.js](https://www.datocms.com/docs/next-js), [Nuxt](https://www.datocms.com/docs/nuxt), [Svelte](https://www.datocms.com/docs/svelte), and [Astro](https://www.datocms.com/docs/astro).

**Want a head start?** Browse our [starter projects](https://www.datocms.com/marketplace/starters) — ready-to-deploy example sites for popular frameworks.


<!--datocms-autoinclude-footer end-->
