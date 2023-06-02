import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("BlogForm component", () => {
  const newBlog = {
    title: "my blog",
    author: "adming",
    url: "admin.net",
  };

  test("submit form calls the event handler when a new blog is created", async () => {
    const createBlog = jest.fn();

    const userSession = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("#blog-title");
    const authorInput = container.querySelector("#blog-author");
    const urlInput = container.querySelector("#blog-url");

    // const titleInput = screen.getByPlaceholderText('Blog title...')
    // const authorInput = screen.getByPlaceholderText('Blog author...')
    // const urlInput = screen.getByPlaceholderText('Blog url...')

    const createButton = screen.getByText("create");

    await userSession.type(titleInput, newBlog.title);
    await userSession.type(authorInput, newBlog.author);
    await userSession.type(urlInput, newBlog.url);
    await userSession.click(createButton);

    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    const div = container.querySelector(".blogform");

    screen.debug(div);
  });
});
