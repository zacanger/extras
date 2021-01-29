const get = async (url, opts) => {
  const res = await window.fetch(url, opts)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}
