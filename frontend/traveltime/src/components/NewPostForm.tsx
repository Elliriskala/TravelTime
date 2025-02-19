import React, {useEffect, useState} from 'react';
import Selector from './Selector';
import {useTags} from '../hooks/apiHooks';

const NewPostForm = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag),
      );
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const {getTags} = useTags();

  useEffect(() => {
    const fetchTags = async () => {
      const allTags = await getTags();
      setTags(allTags.map((tag) => tag.tag_name));
    };
    fetchTags();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submit', selectedTags);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue rounded-lg shadow-lg p-3 w-full sm:w-4/5 md:w-3/5 md:max-w-170 mt-3 m-auto text-darkgreen flex flex-col"
    >
      <p className="font-bold">TravelTime!</p>
      <button
        type="button"
        className="bg-lightblue text-darkblue shadow-xl text-center p-2 rounded-xl transform-all duration-300 ease-in-out hover:bg-offwhite cursor-pointer w-50 justify-center m-auto mt-4"
      >
        + Add a picture/video
      </button>
      <div className="w-60 h-60 md:w-80 md:h-80 bg-lightblue my-6 shadow-lg justify-center items-center m-auto"></div>
      <div className="flex sm:max-w-100 flex-col">
        <h2 className="font-light mb-4 mx-6">Destination:</h2>
        <p className="mx-8 font-bold text-darkblue">Continent</p>
        <input
          type="text"
          className="p-1 bg-offwhite rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
          required
          minLength={3}
          maxLength={30}
        />
        <p className="mx-8 font-bold text-darkblue">Country</p>
        <input
          type="text"
          className="p-1 bg-offwhite rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
          required
          minLength={3}
          maxLength={30}
        />
        <p className="mx-8 font-bold text-darkblue">City</p>
        <input
          type="text"
          className="p-1 bg-offwhite rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
          required
          minLength={1}
          maxLength={30}
        />
      </div>
      <h2 className="font-light my-4 mx-6">Date of the trip:</h2>
      <div className="flex w-full flex-row flex-wrap mb-2">
        <div>
          <p className="mx-8 font-bold text-darkblue mt-1">Start date</p>
          <input
            type="date"
            className="p-1 sm:max-w-100 w-50 bg-offwhite rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
            required
          />
        </div>
        <div>
          <p className="font-bold text-darkblue mx-8 mt-1">End date</p>
          <input
            type="date"
            className="p-1 sm:max-w-100 w-50 bg-offwhite rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
            required
          />
        </div>
      </div>
      <div className="flex mx-7 flex-col my-4">
        <Selector
          options={tags}
          selected=""
          setSelected={handleTagSelect}
          placeholder="Select tags"
          searchPlaceholder="Search for tags"
          customStyles="max-w-50 sm:max-w-60"
        />
        <div className="mx-1 mt-3 flex">
          {selectedTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="bg-lightblue p-1 px-3 rounded-lg shadow-lg text-darkblue"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 text-darkgreen hover:text-darkergreen"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col mt-4">
        <h2 className="font-light mb-4 mx-6">Description:</h2>
        <textarea
          className="p-1 bg-offwhite h-20 max-h-30 rounded-lg focus:outline-none focus:ring-0 shadow-lg m-auto my-2 mx-8"
          required
          minLength={1}
          maxLength={400}
        />
      </div>
      <button
        type="submit"
        className="bg-green text-offwhite shadow-xl text-center p-2 rounded-4xl transform-all duration-300 ease-in-out hover:bg-lightgreen hover:text-darkergreen cursor-pointer w-20 justify-center m-auto mt-6 mb-2 font-bold"
      >
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
