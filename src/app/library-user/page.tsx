'use client'

import Container from '@/components/ui/container';
import ContentWrapper from '@/components/ui/ContentWrapper';
import Users from './components/LibraryUser';
import withLayout from '@/hoc/withLayout';

const Page = () => {
  return (
    <Container>
      <ContentWrapper>
        <Users />
      </ContentWrapper>
    </Container>
  );
}

export default withLayout(Page)
