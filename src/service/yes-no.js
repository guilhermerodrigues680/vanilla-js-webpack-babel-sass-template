import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'https://yesno.wtf/api',
})

async function getYesNo() {
  const res = await apiInstance.get();
  return res.data;
}

export { getYesNo }
