'use client'

import Container from '@/components/ui/container';
import ContentWrapper from '@/components/ui/ContentWrapper';
import withLayout from '@/hoc/withLayout';
import Loans from './components/Loans';


const Page = () => {
  return (
    <Container>
      <ContentWrapper>
        <Loans />
      </ContentWrapper>
    </Container>
  );
}

export default withLayout(Page)
