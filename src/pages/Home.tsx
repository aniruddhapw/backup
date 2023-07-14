import { useEffect } from 'react'
import usePosts from 'hooks/usePostApi'
import TemporaryDrawer from 'components/common/RightDrawer'
import ConnectVia from 'components/ConnectVia'
import SwipeableTemporaryDrawer from 'components/Test'

const Home = () => {
  const { getPosts, getPost } = usePosts(1)
  useEffect(() => {
    getPosts()
    getPost()
  }, [])
  return <div>Home
    
    <TemporaryDrawer/>
    <ConnectVia connectVia='WebHook'/>
    {/* <SwipeableTemporaryDrawer/> */}
  </div>
}

export default Home
