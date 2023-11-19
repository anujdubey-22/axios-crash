// GET REQUEST
function getTodos() {
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todos',
    params:{
      _limit:5
    }
  })
  .then((res)=>{
    showOutput(res)
  })
  .catch((err)=>{
    showOutput(err)
  });
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',
  {  firstName: 'Fred',
     lastName: 'Flintstone' })
     .then((res) => {
      showOutput(res)
     })
     .catch(err => showOutput(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/todos/4',
  { firstName: 'Fredi',
     lastName: 'Flintstot',
     title: "e"}
     )
     .then(res => showOutput(res))
     .catch(err => showOutput(err));

  //    axios.put('https://jsonplaceholder.typicode.com/todos/4',
  // { firstName: 'Fredi',
  //    lastName: 'Flintstot',
  //    title: "e"}
  //    )
  //    .then(res => showOutput(res))
  //    .catch(err => showOutput(err));
}


// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/4')
  .then((res) => {
    showOutput(res)
  })
  .catch(err => showOutput(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos/4'),
    axios.put('https://jsonplaceholder.typicode.com/todos/4',
  { firstName: 'Fredi',
     lastName: 'Flintstot',
     title: "e"}
     )
  ])
  .then(axios.spread((get,put) => showOutput(put)))
  .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {

  const config = {
    headers: {
      'Content-Type':'application/json',
      Authorization: 'sometoken'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos',
  {  firstName: 'Fred',
     lastName: 'Flintstone' },config)
     .then((res) => {
      showOutput(res)
     })
     .catch(err => showOutput(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse:axios.defaults.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/tdos',
    params:{
      _limit:5
    }
  })
  .then((res)=>{
    showOutput(res)
  })
  .catch((err)=>{
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/todos',
    
      cancelToken: source.token
    
  })
  .then((res)=>{
    showOutput(res)
  })
  .catch(thrown => {
    if (axios.isCancel(thrown)){
      console.log('Request canceled',thrown.message);
    }
  })
  if(true){
    source.cancel('Request cancel')
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(`${config.method.toUpperCase()} request sent to 
    ${config.url} at ${new Date().getTime()} `)

    return config;
  },
  error => { return Promise.reject(error);
  }

)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
