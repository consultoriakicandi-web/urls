'use strict';

const express = require('express');

const app = express();
app.use(express.json());

const urls = [];

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

app.post('/urls', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'url is required' });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'invalid url' });
  }

  const entry = { id: urls.length + 1, url, createdAt: new Date().toISOString() };
  urls.push(entry);

  return res.status(201).json(entry);
});

app.get('/urls', (req, res) => {
  return res.json(urls);
});

module.exports = { app, urls };
