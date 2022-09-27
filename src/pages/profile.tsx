import { addPosts } from '@src/atom/posts';
import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import ProfileIntroSection from '@src/components/template/ProfilePage/ProfileIntroSection';
import ProfilePostsSection from '@src/components/template/ProfilePage/ProfilePostsSection';
import { FullWidthOverflowWrapper } from '@src/components/ui/atom';
import siteMetadata from '@src/core/config/siteMetadata';
import { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';

// Todo: enable ssr
// export const getServerSideProps = withAuthSSR();

const ProfilePage: NextPage = () => {
  const { posts } = useRecoilValue(addPosts);

  return (
    <PageLayout showNavigation fullWidth fixedHeight>
      <PageSEO title={siteMetadata.title + ' Profile'} description={'profile page'} />
      <FullWidthOverflowWrapper>
        <ProfileIntroSection />
        <ProfilePostsSection posts={posts} />
      </FullWidthOverflowWrapper>
    </PageLayout>
  );
};

export default ProfilePage;
