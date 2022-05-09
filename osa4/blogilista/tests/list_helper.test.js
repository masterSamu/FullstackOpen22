const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogs = [
    {
      author: "Bruce Banner",
      title: "Hulk is green",
      url: "www.google.com",
      likes: 5,
    },
    {
      author: "Tony Stark",
      title: "Iron Man is made from iron",
      url: "www.google.com",
      likes: 10,
    },
    {
      author: "Steve Rogers",
      title: "America miss his Captain",
      url: "www.google.com",
      likes: 5,
    },
  ];

  test("If blogs is empty, return zero", () => {
    const emptyBlogs = [];
    const result = listHelper.totalLikes(emptyBlogs);
    expect(result).toBe(0);
  });

  test("Blog has only one blog, return likes from that", () => {
    const blogsWithOneItem = [blogs[0]];
    const result = listHelper.totalLikes(blogsWithOneItem);
    expect(result).toBe(5);
  });

  test("Count total likes from all blogs", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(20);
  });
});

describe("favorite blog", () => {
  const blogs = [
    {
      author: "Bruce Banner",
      title: "Hulk is green",
      url: "www.google.com",
      likes: 5,
    },
    {
      author: "Tony Stark",
      title: "Iron Man is made from iron",
      url: "www.google.com",
      likes: 10,
    },
    {
      author: "Steve Rogers",
      title: "America miss his Captain",
      url: "www.google.com",
      likes: 5,
    },
  ];

  test("Blog is empty, return 0", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(0);
  });

  test("Blog with most likes, return blog from index 1", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });
});

describe("most blogs", () => {
  const blogs = [
    {
      author: "Bruce Banner",
      title: "Hulk is green",
      url: "www.google.com",
      likes: 5,
    },
    {
      author: "Tony Stark",
      title: "Iron Man is made from iron",
      url: "www.google.com",
      likes: 10,
    },
    {
      author: "Steve Rogers",
      title: "America miss his Captain",
      url: "www.google.com",
      likes: 5,
    },
    {
      author: "Tony Stark",
      title: "Iron Man returns",
      url: "www.google.com",
      likes: 10,
    },
  ];

  test("Blog is empty, return 0", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(0);
  });

  test("Author with most blogs", () => {
    const expectedResult = { author: "Tony Stark", blogs: 2 };
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(expectedResult);
  });
});


describe("Most likes", () => {
    const blogs = [
        {
          author: "Bruce Banner",
          title: "Hulk is green",
          url: "www.google.com",
          likes: 5,
        },
        {
          author: "Tony Stark",
          title: "Iron Man is made from iron",
          url: "www.google.com",
          likes: 10,
        },
        {
          author: "Steve Rogers",
          title: "America miss his Captain",
          url: "www.google.com",
          likes: 5,
        },
        {
          author: "Tony Stark",
          title: "Iron Man returns",
          url: "www.google.com",
          likes: 15,
        },
      ];

      
    test("Blog with most likes", () => {
        const result = listHelper.mostLikes(blogs);
        const expectedResult = {author: "Tony Stark", blogs: 25}
        expect(result).toEqual(expectedResult);
    })
})
