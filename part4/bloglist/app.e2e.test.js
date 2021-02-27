const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const BlogModel = require('./models/blog')
const UserModel = require('./models/user')
const app = require('./app')

const api = supertest(app)

const dummyBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    _id: new mongoose.Types.ObjectId(),
  }, {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    _id: new mongoose.Types.ObjectId(),
  }, {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    _id: new mongoose.Types.ObjectId(),
  }, {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    _id: new mongoose.Types.ObjectId(),
  }, {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    _id: new mongoose.Types.ObjectId(),
  }, {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    _id: new mongoose.Types.ObjectId(),
  },
];

let dummyUsers = [{
  username: 'woodenharp',
  nickname: 'woodenharp',
  password: 'password',
  _id: new mongoose.Types.ObjectId(),
  blog: [],
}, {
  username: 'liuzhongjing',
  nickname: 'Liu Zhongjing',
  password: '123456',
  _id: new mongoose.Types.ObjectId(),
  blog: [],
}];

const dummytoken = `Bearer ${jwt.sign({
  username: dummyUsers[0].username,
  id: dummyUsers[0]._id
}, process.env.SECRET)}`;

beforeAll(async () => {
  dummyBlogs.forEach((blog, idx) => {
    blog.user = dummyUsers[idx % 2]._id;
    dummyUsers[idx % 2].blog.push(blog._id);
  });
  dummyUsers = await Promise.all(dummyUsers.map(async (user) => {
    const passwordHashed = await bcrypt.hash(user.password, 10);
    return {
      ...user,
      password: passwordHashed,
    };
  }));
  await BlogModel.deleteMany({});
  await UserModel.deleteMany({});
  await Promise.all(dummyBlogs.map((blog) => new BlogModel(blog).save()));
  await Promise.all(dummyUsers.map((user) => new UserModel(user).save()));
}, 10000);

afterAll(async () => {
  mongoose.connection.close();
});

describe("Blog API e2e test", () => {
  test("Test get bloglist", async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveLength(dummyBlogs.length);
      });
  });
  
  test('Test bloglist item id', async () => {
    await api
      .get('/api/blogs')
      .expect((res) => {
        res.body.forEach((article) => expect(article.id).toBeDefined());
      });
  });
  
  test('Test create a new blog post', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', dummytoken)
      .send({
        title: 'Test blog',
        author: 'John Titor',
        url: 'http://timetravel',
        likes: 999,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body.likes).toBe(999);
      });
  });
  
  test('Test create a new blog post without likes', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', dummytoken)
      .send({
        title: 'Test blog',
        author: 'John Titor',
        url: 'http://timetravel',
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body.likes).toBe(0);
      });
  });
  
  test('Test create an empty blog would raise error', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', dummytoken)
      .send({
        url: 'http://timetravel',
      })
      .expect(400)
      .expect('Bad request');
  });
  
  test('Test delete a blog', async () => {
    const [{ _id: id }] = dummyBlogs;
    await api.delete(`/api/blogs/${id.toString()}`)
      .set('Authorization', dummytoken)
      .expect(204);
    const { body: postbloglist } = await api.get('/api/blogs');
    expect(postbloglist).toHaveLength(dummyBlogs.length + 1);
  });

  test('Test try delete a blog with no permission', async () => {
    const [, { _id: id }] = dummyBlogs;
    await api.delete(`/api/blogs/${id.toString()}`)
      .set('Authorization', dummytoken)
      .expect(401)
      .expect({
        error: 'Permission denied',
      });
  })
  
  test('Test update a blog content', async () => {
    const response = await api.get('/api/blogs');
    const { body: bloglist } = response;
    const [{ id, user, ...rest }] = bloglist;
    await api
      .put(`/api/blogs/${id}`)
      .send({
        title: 'New title',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          ...rest,
          title: 'New title',
        });
      });
  });
});

describe('User e2e test', () => {
  test('Test get users', async () => {
    await api.get('/api/user/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(dummyUsers.length);
      });
  });

  test('Test create a user', async () => {
    await api.post('/api/user/')
      .send({
        username: "xdf3e",
        nickname: "2esef",
        password: "sdfw"
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body).not.toHaveProperty('password');
        expect(res.body.username).toBe('xdf3e');
      });
  });

  test('Test try creating an invalid user', async () => {
    await api.post('/api/user')
      .send({
        username: 't',
        password: 'abc',
      })
      .expect(400);
    await api.post('/api/user')
      .send({
        username: 'tcs',
        password: 'a',
      })
      .expect(400)
      .expect('Password too short');
  });
});

describe('Login and authentication', () => {
  test('Login user', async () => {
    await api.post('/api/login')
      .send({
        username: 'liuzhongjing',
        password: '123456',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          username: 'liuzhongjing',
          nickname: 'Liu Zhongjing',
        });
      });
  });

  test('Login failure', async () => {
    await api.post('/api/login')
      .send({
        username: 'liuzhongjing',
        password: 'password',
      })
      .expect(401)
      .expect(({
        error: 'invalid username or password',
      }));
  })
});
