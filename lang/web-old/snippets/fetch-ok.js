const fetchOk = (...args) =>
  fetch(...args)
    .then((res) => res.ok ? res : res.json()
      .then((data) => {
        throw Object.assign(new Error(data.error_message), { name: res.statusText })}))

fetchOk(someEndpoint)
  .then((res) => res.json())
  .catch(console.log)
