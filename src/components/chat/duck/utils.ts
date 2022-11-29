export const postMessage = (message: string) => {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", `${process.env.REACT_APP_API}/publish`, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify({ message }));
};

export const getMessages = () => {
  return fetch(`${process.env.REACT_APP_API}/messages`)
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const subscribe = (callback: (data: string) => void) => {
  return fetch(`${process.env.REACT_APP_API}/subscribe?r=${Math.random()}`)
    .then((response) => response.text())
    .then((data) => {
      callback(data);
      subscribe(callback);
    })
    .catch((e) => {
      console.log(e);
      setTimeout(() => subscribe(callback), 500);
    });
};
