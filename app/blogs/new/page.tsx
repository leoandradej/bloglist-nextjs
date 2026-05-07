import { createBlog } from "../../actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Create a New Blog</h2>
      <form action={createBlog} className="flex flex-col gap-2">
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              required
              className="border border-white p-0.5 rounded-md mx-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="author"
              required
              className="border border-white p-0.5 rounded-md mx-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="url"
              name="url"
              required
              className="border border-white p-0.5 rounded-md mx-1 focus:border-yellow-400 focus:outline focus:outline-yellow-400"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 rounded-md py-1 px-4 w-fit text-gray-700 font-bold hover:bg-amber-400 transition-colors duration-300 cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
