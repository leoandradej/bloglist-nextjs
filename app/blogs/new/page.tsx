"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "../../components/NotificationProvider";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    success: false,
    values: { title: "", author: "", url: "" },
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);
  return (
    <div className="container">
      <h2>Create a New Blog</h2>
      <form action={formAction}>
        <div className="relative">
          <label>
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors?.title && (
            <span className="error-message">{state.errors.title}</span>
          )}
        </div>
        <div className="relative">
          <label>
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors?.author && (
            <span className="error-message">{state.errors.author}</span>
          )}
        </div>
        <div className="relative">
          <label>
            URL
            <input type="url" name="url" defaultValue={state.values?.url} />
          </label>
          {state.errors?.url && (
            <span className="error-message">{state.errors.url}</span>
          )}
        </div>
        <button type="submit" className="mx-auto">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
