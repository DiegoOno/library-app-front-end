'use client'

import Container from '@/components/ui/container';
import ContentWrapper from '@/components/ui/ContentWrapper';
import withLayout from '@/hoc/withLayout';
import Books from './components/Books'

const Page = () => {
  return (
    <Container>
      <ContentWrapper>
        <Books />
      </ContentWrapper>
    </Container>
  );
}

export default withLayout(Page)
