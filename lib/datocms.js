import tiny from 'tiny-json-http';

export async function request({ query, variables, preview }) {

  let endpoint = 'https://graphql.datocms.com';

  if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  const token = preview
    ? process.env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN
    : process.env.DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN;

  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      query,
      variables,
    },
  });

  if (body.errors) {
    console.error("Ouch! The query has some errors!");
    throw body.errors;
  }

  return body.data;
}
