import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const DynamicMeta: React.FC<MetaProps> = (props) => {
  const { pathname } = useRouter();
  // const baseUrl = 'https://getvendorstack.com';
  //ensures there's only one trailing slash
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '/') || 'https://getvendorstack.com/';



  const defaultMeta: MetaProps = {
    title: 'Default Page',
    description: 'This is the default page of our Next.js app.',
    keywords: 'nextjs, typescript, default',
    ogImage: `${baseUrl}assets/images/effortless.png`,
  };

  const routeMeta: Record<string, MetaProps> = {
    '/profile': {
      title: 'Profile Page',
      description: 'This is the profile page of our Next.js app.',
      keywords: 'profile, user, nextjs',
      ogImage: `${baseUrl}assets/images/secure.png`,
    },
    '/explore': {
      title: 'Explore Page',
      description: 'Discover new content on our explore page.',
      keywords: 'explore, discover, nextjs',
      ogImage: `${baseUrl}assets/images/boxImage.png`,
    },
  };

  const [mergedMeta, setMergedMeta] = useState<MetaProps>({
    ...defaultMeta,
    ...routeMeta[pathname],
    ...props,
  });

  useEffect(() => {
    setMergedMeta({
      ...defaultMeta,
      ...routeMeta[pathname],
      ...props, // Ensure props override route-specific metadata
    });
  }, [pathname, props]);

  // // solution 1
  const siteUrl = `${baseUrl}${pathname}`.replace(/\/+$/, '').replace(/^\/+/, '');
// Removes trailing slash from baseUrl and leading slash from pathname

////solution 2
// const siteUrl = new URL(pathname, baseUrl).href;
// // Will handle slashes correctly and output: "https://getvendorstack.com/profile"

////solution 3
// const formattedPathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;
// const siteUrl = `${baseUrl}${formattedPathname}`;


  return (
    <Head>
      <title>{mergedMeta.title}</title>
      <meta name="description" content={mergedMeta.description} />
      <meta name="keywords" content={mergedMeta.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph Meta */}
      <meta property="og:title" content={mergedMeta.title} />
      <meta property="og:description" content={mergedMeta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={mergedMeta.ogImage} />

      {/* Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={mergedMeta.title} />
      <meta name="twitter:description" content={mergedMeta.description} />
      <meta name="twitter:image" content={mergedMeta.ogImage} />
    </Head>
  );
};

export default DynamicMeta;








// // components/DynamicMeta.tsx without props
// import Head from 'next/head';
// import { useRouter } from 'next/router';

// const DynamicMeta = () => {
//   const { pathname } = useRouter();

//   // Default metadata
//   let title = 'Default Page';
//   let description = 'This is the default page of our Next.js app===.';
//   let keywords = 'nextjs, typescript, default';
//   // let siteUrl = `https://getvendorstack.com${pathname}`; // Update with your actual domain
//   const baseUrl = 'https://getvendorstack.com'; // Use your deployed domain
//   let ogImage = `${baseUrl}/assets/images/effortless.png`; // Default OG image
//   let siteUrl = `${baseUrl}${pathname}`; // Update with your actual domain


//   // Dynamic metadata based on the route
//   switch (pathname) {
//     case '/profile':
//       title = 'Profile Page';
//       description = 'This is the profile page of our Next.js app.';
//       keywords = 'profile, user, nextjs';
//       // ogImage = '/assets/images/verified-16.webp'; // Example specific OG image
//       ogImage = `${baseUrl}/assets/images/secure.png`;
//   // /assets/images/vendorstack-logo.webp

//       break;
//     case '/explore':
//       title = 'Explore Page';
//       description = 'Discover new content on our explore page.';
//       keywords = 'explore, discover, nextjs';
//       // ogImage = '/assets/images/vendorstack-logo.webp'; // Example specific OG image
//       ogImage = `${baseUrl}/assets/images/boxImage.png`;
//       break;
//   }

//   return (
//     <Head>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <meta name="keywords" content={keywords} />
//       <meta name="viewport" content="width=device-width, initial-scale=1" />
//       <link rel="icon" href="/favicon.ico" />

//       {/* Open Graph meta tags for social sharing */}
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content={siteUrl} />
//       <meta property="og:image" content={ogImage} />

//       <meta name="twitter:card" content="summary_large_image" />
//       {/* <meta name="twitter:card" content="summary_medium_image" /> */}
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={ogImage} />
//     </Head>
//   );
// };

// export default DynamicMeta;