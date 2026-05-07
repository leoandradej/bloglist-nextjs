type BlogProps = {
  title: string;
  author: string;
  url: string;
  likes?: number;
};

const blogs = [
  {
    id: 1,
    title: "The TypeScript Transition: Moving Beyond Basic Types",
    author: "Ravi Gupta",
    url: "https://example.com",
    likes: 0,
  },
  {
    id: 2,
    title: "The Flour Factor: Why Precision Is the Secret Ingredient",
    author: "Isla Whitaker",
    url: "https://example.com",
    likes: 0,
  },
  {
    id: 3,
    title: "Forgotten Melodies: The History of Early Jazz in New Orleans",
    author: "Desmond Vance",
    url: "https://example.com",
    likes: 0,
  },
];

let nextId = 4;

export const getBlogs = () => blogs;

export const addBlog = ({ title, author, url, likes = 0 }: BlogProps) => {
  blogs.push({ id: nextId++, title, author, url, likes });
};

export const getBlogById = (id: number) => blogs.find((blog) => blog.id === id);

export const incrementLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);

  if (blog) blog.likes = blog.likes + 1;
};
