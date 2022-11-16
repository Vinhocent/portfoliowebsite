import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { IPost } from "../../types/post";
import { getPost, getAllPosts } from "../../lib/mdx";
import { ParsedUrlQuery } from "querystring";
import Head, { defaultHead } from "next/head";

// props type
type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
};

// components to render

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  const [fading, setFading] = useState(" opacity-0 ease-in ");
  const [heading, setHeading] = useState("tr1e_");
  const [subheading, setSubHeading] = useState("digital warlord @f0r3st");

  useEffect(() => {
    setFading(" opacity-100 ease-in ");
    setHeading("Tri Ho");
    setSubHeading("CS Student @ UWaterloo");
  }, []);

  // get setters
  return (
    <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 px-8 sm:px-0 mx-auto pb-12">
      <Head>
        <title>{heading + frontMatter.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={subheading} name="description" />
        <meta property="og:site_name" content={heading + frontMatter.title} />
        <meta property="og:description" content={subheading} />
        <meta property="og:title" content={heading + frontMatter.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vinhocent" />
        <meta name="twitter:title" content={heading + frontMatter.title} />
        <meta name="twitter:description" content={subheading} />
        <link rel="shortcut icon" href="/public/tr1e.svg" />
      </Head>
      <h1
        className={
          "font-bold text-2xl md:text-4xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-600 " +
          fading
        }
      >
        {frontMatter.title}
      </h1>
      <div
        className={
          " flex-col items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-2 pb-8 "
        }
      >
        <ul
          className={
            " flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600 " +
            fading
          }
        >
          <div className="dark:text-white text-gray-800 ">
            {frontMatter.date}
          </div>
        </ul>

        <ul
          className={
            " flex flex-row justify-items-start items-center mb-4 transition-opacity duration-600 " +
            fading
          }
        >
          <div className="dark:text-white text-gray-800 ">
            {frontMatter.description}
          </div>
        </ul>
        <ul className={"transition-opacity duration-600 " + fading}>
          <span className=" flex  w-full border-t opacity-60 dark:border-gray-500 my-6 self-end shrink border-gray-400"></span>
        </ul>
        <div className={"transition-opacity delay-1200 duration-600" + fading}>
          <MDXRemote {...source} />
        </div>
      </div>
    </div>
  );
};

{
  /* <MDXRemote  {...source} /> */
}
export default PostPage;

interface Iparams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;
  // get the slug
  const { content, data } = getPost(slug);
  // serialize the data on the server side
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  //only get the slug from posts
  const posts = getAllPosts(["slug"]);

  // map through to return post paths
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
