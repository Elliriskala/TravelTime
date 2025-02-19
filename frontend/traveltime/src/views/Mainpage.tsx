import PostRow from '../components/PostRow';
import Selector from '../components/Selector';
import {useEffect, useState} from 'react';
import {useTags} from '../hooks/apiHooks';

const Mainpage = () => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Newest');

  const {getTags} = useTags();

  useEffect(() => {
    const fetchTags = async () => {
      const allTags = await getTags();
      setTags(allTags.map((tag) => tag.tag_name));
    };
    fetchTags();
  }, []);

  return (
    <>
      <div
        className="
      p-2 bg-blue rounded-lg text-darkblue flex items-center w-90 sm:justify-between m-auto mx-1 my-2 shadow-lg sm:w-full md:w-200 lg:max-w-250 sm:flex-row flex-col "
      >
        <Selector
          options={tags}
          selected={destination}
          setSelected={setDestination}
          placeholder="Select destination"
          searchPlaceholder="city, country, continent"
        />
        <Selector
          options={tags}
          selected={category}
          setSelected={setCategory}
          placeholder="Select a category"
          searchPlaceholder="search categories"
        />
        <Selector
          options={['Newest', 'Oldest', 'Most popular']}
          selected={sortBy}
          setSelected={setSortBy}
          placeholder="Sort by"
          searchPlaceholder=""
          hideSearch={true}
        />
      </div>
      <section className="grid grid-cols-2 gap-2 m-auto md:grid-cols-3 lg:grid-cols-4 lg:mt-8">
        <PostRow
          post={{
            post_id: 1,
            city: 'Hanoi',
            country: 'Vietnam',
            media_url: '',
            thumbnail: '',
            screenshots: [],
          }}
        />
      </section>
    </>
  );
};

export default Mainpage;
