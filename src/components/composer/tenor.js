import axios from './axios';
const API_KEY = '215FYG14GWN6';

export async function search(q, limit = 20) {
  const url = `search?key=${API_KEY}&q=${q}&limit=${limit}`;

  try {
    const request = await axios.get(url);
    return request.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCategories(limit = 20) {
  try {
    const url = `categories?key=${API_KEY}&limit=${limit}&type=trending`;
    const request = await axios.get(url);

    return request?.data?.tags;
  } catch (error) {
    console.log(error);
  }
}

export async function get(url) {
  try {
    const request = await fetch(url);
    return await request.json();
  } catch (error) {
    console.log(error);
  }
}
