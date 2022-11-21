import { buildClient } from "@datocms/cma-client-node";

async function vercelInitialization(
  vercelProjectId,
  vercelTeamId,
  vercelApiToken,
  buildTriggerId,
  siteSearchToken
) {
  await fetch(
    `https://api.vercel.com/v10/projects/${vercelProjectId}/env?teamId=${vercelTeamId}`,
    {
      headers: {
        Authorization: `Bearer ${vercelApiToken}`,
      },
      method: "post",
      body: JSON.stringify([
        {
          type: "encrypted",
          key: "NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID",
          value: buildTriggerId,
          target: ["development", "production", "preview"],
        },
        {
          type: "encrypted",
          key: "NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH",
          value: siteSearchToken,
          target: ["development", "production", "preview"],
        },
      ]),
    }
  );
}

async function netlifyInitialization(
  netlifySiteId,
  netlifyToken,
  buildTriggerId,
  siteSearchToken
) {
  await fetch(`https://api.netlify.com/api/v1/sites/${netlifySiteId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${netlifyToken}`,
    },
    method: "PUT",
    body: JSON.stringify({
      build_settings: {
        env: { 
          NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID: buildTriggerId,
          NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH: siteSearchToken,
        },
      },
    }),
  });
}

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ success: true });
  }

  if (req.method !== "POST") {
    return res.status(404).json({ error: "Invalid route" });
  }

  try {
    const client = buildClient({ apiToken: req.body.datocmsApiToken });

    const buildTriggers = await client.buildTriggers.list();
    const buildTriggerId = buildTriggers[0].id;

    await client.buildTriggers.update(buildTriggerId, {
      indexing_enabled: true,
    });

    await client.buildTriggers.reindex(buildTriggerId);

    const accessTokens = await client.accessTokens.list();

    const siteSearchToken = accessTokens.find(
      (token) => token.name === "Site Search"
    ).token;

    if (req.body.integrationInfo.adapter === "vercel") {
      await vercelInitialization(
        req.body.integrationInfo.vercelProjectId,
        req.body.integrationInfo.vercelTeamId,
        req.body.integrationInfo.vercelProjectId,
        buildTriggerId,
        siteSearchToken
      );
    }

    if (req.body.integrationInfo.adapter === "netlify") {
      await netlifyInitialization(
        req.body.integrationInfo.netlifySiteId,
        req.body.integrationInfo.netlifyToken,
        buildTriggerId,
        siteSearchToken
      );
    }
    
    await client.buildTriggers.trigger(buildTriggerId);

    return res.status(200).json({ success: siteSearchToken });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      request: error.request,
      response: error.response,
    });
  }
};
