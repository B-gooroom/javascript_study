const membersCreate = function () {
  const member = {
    name: document.getElementById('member-name').value,
    age: document.getElementById('member-age').value
  };
  axios.post('https://be-gooroom-default-rtdb.firebaseio.com/members.json', member).then(function (response) {
    console.log('Done membersCreate', response.data);
    membersRead();
  });
};