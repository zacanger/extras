import React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import HomeMainSection from './main-section'
import CategoryMenuContainer from '../category-menu/container'
import PostListContainer from '../post-list/container'
import PostDetailContainer from '../post-detail/container'
import SidebarContainer from '../sidebar/container'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`

const Home = () => (
  <Wrapper>
    <HomeMainSection>
      <Route component={CategoryMenuContainer} />
      <Route exact path="/" component={PostListContainer} />
      <Route
        exact
        path="/a/:category"
        render={({ match }) => (
          <PostListContainer category={match.params.category} />
        )}
      />
      <Route
        exact
        path="/u/:username"
        render={({ match }) => (
          <PostListContainer username={match.params.username} />
        )}
      />
      <Route
        exact
        path="/a/:category/:post"
        render={({ match, history }) => (
          <PostDetailContainer id={match.params.post} history={history} />
        )}
      />
    </HomeMainSection>
    <Route component={SidebarContainer} />
  </Wrapper>
)

export default Home
