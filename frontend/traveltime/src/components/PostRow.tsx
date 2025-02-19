import {TravelPost} from 'hybrid-types/DBTypes';
import {CiHeart} from 'react-icons/ci';

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
    <article className=" bg-lightblue text-darkblue my-1 mx-1 shadow-xl">
      <div className="m-2 mx-2 mb-0 flex justify-between items-center gap-2">
        <p className="w-25 h-10 flex items-center my-1">
          {post.city}, {post.country}
        </p>
        <div className="rounded-4xl p-1 px-2 bg-blue w-18 text-center h-10 flex items-center justify-center gap-1">
          <CiHeart className='cursor-pointer' size={22} />
          <p>22</p>
        </div>
      </div>
      <div className="h-60 w-60 sm:w-70 lg:mx-w-80 p-2 m-1 cursor-pointer">
        <img
          className="object-cover w-full h-full m-2"
          src={
            post.thumbnail ||
            (post.screenshots && post.screenshots[2]) ||
            undefined
          }
          alt={post.media_url}
        />
      </div>
    </article>
  );
};

export default PostRow;
