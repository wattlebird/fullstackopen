const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) => {
  let im = 0;
  blogs.forEach((itm, idx) => {
    if (itm.likes > blogs[im].likes) im = idx;
  });
  return blogs[im];
};

const mostBlogs = (blogs) => {
  const lut = {};
  let mostBlogCount = 0;
  let mostBlogAuthor;
  blogs.forEach((itm) => {
    if (Object.prototype.hasOwnProperty.call(lut, itm.author)) lut[itm.author] += 1;
    else lut[itm.author] = 1;
    if (lut[itm.author] > mostBlogCount) {
      mostBlogCount = lut[itm.author];
      mostBlogAuthor = itm.author;
    }
  });
  return ({
    author: mostBlogAuthor,
    blogs: mostBlogCount,
  });
};

const mostLikes = (blogs) => {
  const lut = {};
  let likes = 0;
  let author;
  blogs.forEach((itm) => {
    if (Object.prototype.hasOwnProperty.call(lut, itm.author)) lut[itm.author] += itm.likes;
    else lut[itm.author] = itm.likes;
    if (lut[itm.author] > likes) {
      likes = lut[itm.author];
      author = itm.author;
    }
  });
  return {
    author,
    likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
