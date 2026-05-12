import url from 'url';

export default async (req, res) => {
  const publicPreview =
    process.env.NEXT_EXAMPLE_CMS_DATOCMS_PUBLIC_PREVIEW === 'true';
  const secret =
    process.env.NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET;

  // Check the secret unless this deployment explicitly allows public preview.
  if (!publicPreview && (!secret || req.query.secret !== secret)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  const uri = url.parse(req.query.page || req.query.slug || '/', true);
  const sanitizedUrl = `${uri.pathname}${uri.search || ''}`;

  res.redirect(sanitizedUrl);
};
