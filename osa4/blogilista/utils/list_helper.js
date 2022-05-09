const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (previous, current) => {
    return previous.likes > current.likes ? previous : current;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const result = blogs.reduce((a, c) => {
    a[c.author] = (a[c.author] || 0) + 1;
    return a;
  }, {});
  const values = Object.values(result);
  const biggestBlogCount = Math.max(...values);
  const author = Object.keys(result).find(
    (key) => result[key] === biggestBlogCount
  );

  const mostBlogsObject = { author: author, blogs: biggestBlogCount };
  return mostBlogsObject;
};

const mostLikes = (blogs) => {
  const result = blogs.reduce((a, b) => {
    a[b.author] = (a[b.author] || 0) + Number(b.likes);
    return a;
  }, {});
  /*
  const result = blogs.reduce(
    (a, b) => a.set(b.author, (a.get(b.author) || 0) + Number(b.likes)),
    new Map()
  );
  const obj = Object.fromEntries(result);
  console.log(obj)*/
  console.log(result);
  const values = Object.values(result);
  const biggestBlogCount = Math.max(...values);
  const author = Object.keys(result).find(
    (key) => result[key] === biggestBlogCount
  );
  const mostBlogsObject = { author: author, blogs: biggestBlogCount };
  console.log("RESULT:", mostBlogsObject);
  return mostBlogsObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
