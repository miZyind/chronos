
export function get(url: string) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          handleError(reject, 'response.statusText');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject('error status');
        }
      })
      .catch((error) => handleError(reject, error));
  });
}

export function postQuery(url: string, opts?: any) {
  return new Promise((resolve, reject) => {
    console.log(opts);
    fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json' ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opts)
    })
      .then((response) => {
        if (response.status !== 201) {
          handleError(reject, 'response.statusText');
        }
        return response;
      })
      .then((data) => {
        data.text().then((obj) => resolve(obj));
      }).catch((error) => {
        handleError(reject, error);
      });
  });
}

export function post(url: string, opts?: any) {
  return new Promise((resolve, reject) => {
    console.log(opts);
    fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts)
    })
      .then((response) => {
        if (response.status !== 200) {
          handleError(reject, 'response.statusText');
        }
        return response;
      })
      .then((data) => {
        if (data.statusText === 'OK') {
          resolve('yes');
        } else {
          reject('error status');
        }
      }).catch((error) => {
        handleError(reject, error);
      });
  });
}

export function put(url: string, opts?: any) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts)
    })
      .then((response) => {
        if (response.status !== 200) {
          handleError(reject, 'response.statusText');
        }
        return response;
      })
      .then((data) => {
        if (data.statusText === 'OK') {
          resolve('yes');
        } else {
          reject('error status');
        }
      }).catch((error) => {
        handleError(reject, error);
      });
  });
}

export function del(url: string, opts?: any) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts)
    })
      .then((response) => {
        if (response.status !== 200) {
          handleError(reject, 'response.statusText');
        }
        return response;
      })
      .then((data) => {
        if (data.statusText === 'OK') {
          resolve('yes');
        } else {
          reject('error status');
        }
      }).catch((error) => {
        handleError(reject, error);
      });
  });
}

// function checkStatus(response: any) {
//   if (response.status === 200) {
//     return true;
//   }
//   // TODO(zhoulj) check http statu detail
//   return false;
// }

// function checkCode(data: any) {
//   if (data && data.meta && data.meta.code === 200) {
//     return true;
//   }
//   // TODO(zhoulj) check http code detail
//   return false;
// }

function handleError(reject: any, error: any) {
  // TODO(zhoulj) check http error detail
  console.log(' http error: ', error);
  return reject(error);
}
