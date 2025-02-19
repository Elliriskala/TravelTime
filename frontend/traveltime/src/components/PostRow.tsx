import {TravelPost} from 'hybrid-types/DBTypes';

type PostProps = {
  post: Omit<
    TravelPost,
    | 'user_id'
    | 'media_type'
    | 'continent'
    | 'latitude'
    | 'longitude'
    | 'start_date'
    | 'end_date'
    | 'description'
    | 'created_at'
  >;
};

const PostRow = (props: PostProps) => {
  const {post} = props;

  return (
    <article className=" bg-lightblue text-darkblue my-4 md:mx-2 shadow-xl">
      <div className="m-2 mx-3 mb-0 flex justify-between items-center">
        <p className="w-25">
          {post.city}, {post.country}
        </p>
        <div className="rounded-4xl p-1 bg-blue w-20 text-center h-10">
          likes
        </div>
      </div>
      <img
        className="h-60 w-80 p-2"
        src={
          post.thumbnail ||
          (post.screenshots && post.screenshots[2]) ||
          undefined
        }
        alt={post.media_url}
      />
    </article>
  );
};

export default PostRow;
