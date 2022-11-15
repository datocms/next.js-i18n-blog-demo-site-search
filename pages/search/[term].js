import { buildClient } from "@datocms/cma-client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSiteSearch } from "react-datocms";
import Container from "../../components/container";
import Intro from "../../components/intro";
import LanguageBar from "../../components/language-bar";
import Layout from "../../components/layout";

export async function getServerSideProps(context) {
  const token = process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN_SITE_SEARCH;
  const buildTriggerId = process.env.NEXT_EXAMPLE_CMS_DATOCMS_BUILD_TRIGGER_ID;
  return {
    props: { token, buildTriggerId },
  };
}

export default function Search(props) {
  const router = useRouter();
  const { term } = router.query;

  const client = buildClient({
    apiToken: props.token,
  });

  const { state, data } = useSiteSearch({
    client,
    buildTriggerId: props.buildTriggerId,
    initialState: { locale: router.locale },
    highlightMatch: (text, key, context) => <strong key={key}>{text}</strong>,
  });

  useEffect(() => {
    state.setLocale(router.locale);
    state.setQuery(term);
  }, [term, router.locale]);

  return (
    <Layout>
      <Container>
        <LanguageBar />
        <Intro />
        {data &&
          data.pageResults.map((result) => {
            const paramsArray = result.url.split("/");
            const slug = paramsArray[paramsArray.length - 1];
            const isNotHomePage = slug && slug != "it";

            if (isNotHomePage) {
              const formatedSlug = "/posts/" + slug;

              return (
                <div key={result.id} className="mb-5">
                  <h3 className="text-3xl mb-3 leading-snug">
                    <Link as={formatedSlug} href={formatedSlug}>
                      <a className="hover:underline">{result.title}</a>
                    </Link>
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    "{result.bodyExcerpt}"
                  </p>
                </div>
              );
            }
          })}
      </Container>
    </Layout>
  );
}
