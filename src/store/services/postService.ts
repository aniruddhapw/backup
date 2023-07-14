import httpClient from 'http/httpClient'
import {
  GetAllPostsResponse,
  PostService as IPostService,
  Post,
} from 'types/post.model'

const PostService = (): IPostService => {
  return {
    getAllPosts: (): HttpPromise<GetAllPostsResponse> => {
      return httpClient.get('/posts')
    },
    getPostById: (id): HttpPromise<Post> => {
      return httpClient.get(`/posts/${id}`)
    },
  }
}

export default PostService()
