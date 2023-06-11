import { buildClient } from '@datocms/cma-client-node';

async function vercelInitialization(
  vercelProjectId,
  vercelTeamId,
  vercelApiToken,
  buildTriggerId,
  siteSearchToken
) {
  await fetch(`https://api.vercel.com/v10/projects/${vercelProjectId}/env`, {
    headers: {
      Authorization: `Bearer ${vercelApiToken}`,
    },
    method: 'post',
    body: JSON.stringify([
      {
        type: 'encrypted',
        key: 'NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID',
        value: buildTriggerId,
        target: ['development', 'production', 'preview'],
      },
      {
        type: 'encrypted',
        key: 'NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH',
        value: siteSearchToken,
        target: ['development', 'production', 'preview'],
      },
    ]),
  });
}

async function netlifyInitialization(
  apiToken,
  netlifySiteId,
  netlifyToken,
  buildTriggerId,
  siteSearchToken,
  netlifyAccountId
) {
  await fetch(
    `https://api.netlify.com/api/v1/accounts/${netlifyAccountId}/env?site_id=${netlifySiteId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${netlifyToken}`,
      },
      method: 'POST',
      body: JSON.stringify([
        {
          key: 'NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN',
          values: [{ value: apiToken }],
        },
        {
          key: 'NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID',
          values: [{ value: buildTriggerId }],
        },
        {
          key: 'NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH',
          values: [{ value: siteSearchToken }],
        },
      ]),
    }
  );
}

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'Invalid route' });
  }

  try {
    const client = buildClient({ apiToken: req.body.datocmsApiToken });

    const buildTriggers = await client.buildTriggers.list();
    const buildTriggerId = buildTriggers[0].id;

    await client.buildTriggers.update(buildTriggerId, {
      indexing_enabled: true,
    });

    const accessTokens = await client.accessTokens.list();

    const siteSearchToken = accessTokens.find(
      (token) => token.name === 'Site Search'
    ).token;

    if (req.body.integrationInfo.adapter === 'vercel') {
      await vercelInitialization(
        req.body.integrationInfo.vercelProjectId,
        req.body.integrationInfo.vercelTeamId,
        req.body.integrationInfo.vercelApiToken,
        buildTriggerId,
        siteSearchToken
      );
    }

    if (req.body.integrationInfo.adapter === 'netlify') {
      await netlifyInitialization(
        req.body.datocmsApiToken,
        req.body.integrationInfo.netlifySiteId,
        req.body.integrationInfo.netlifyToken,
        buildTriggerId,
        siteSearchToken,
        req.body.integrationInfo.netlifyAccountId
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
