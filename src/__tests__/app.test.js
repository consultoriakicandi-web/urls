'use strict';

const request = require('supertest');
const { app, urls } = require('../app');

beforeEach(() => {
  urls.length = 0;
});

describe('POST /urls', () => {
  it('returns 201 and the created entry for a valid URL', async () => {
    const res = await request(app)
      .post('/urls')
      .send({ url: 'https://example.com' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, url: 'https://example.com' });
    expect(res.body.createdAt).toBeDefined();
  });

  it('returns 400 when url field is missing', async () => {
    const res = await request(app).post('/urls').send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'url is required' });
  });

  it('returns 400 for an invalid URL', async () => {
    const res = await request(app)
      .post('/urls')
      .send({ url: 'not-a-url' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'invalid url' });
  });

  it('rejects non-http/https protocols', async () => {
    const res = await request(app)
      .post('/urls')
      .send({ url: 'ftp://example.com' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'invalid url' });
  });

  it('increments ids for multiple entries', async () => {
    await request(app).post('/urls').send({ url: 'https://first.com' });
    const res = await request(app).post('/urls').send({ url: 'https://second.com' });

    expect(res.body.id).toBe(2);
  });
});

describe('GET /urls', () => {
  it('returns an empty array when no URLs have been posted', async () => {
    const res = await request(app).get('/urls');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all posted URLs', async () => {
    await request(app).post('/urls').send({ url: 'https://example.com' });
    await request(app).post('/urls').send({ url: 'https://other.com' });

    const res = await request(app).get('/urls');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].url).toBe('https://example.com');
    expect(res.body[1].url).toBe('https://other.com');
  });
});
