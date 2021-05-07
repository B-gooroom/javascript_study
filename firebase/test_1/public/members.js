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

const membersRead = function () {
  axios.get('https://be-gooroom-default-rtdb.firebaseio.com/members.json').then(function (response) {
    console.log('Done membersRead', response.data);
    const members = response.data;
    const tbody = document.getElementById('tbody-members');
    tbody.innerHTML = '';
    let index = 0;
    for (let key in members) {
      const member = members[key];
      const tr = document.getElementById('tr-template-members').cloneNode(true);
      tbody.appendChild(tr);
      document.getElementsByName('members-name')[index].innerHTML = member.name;
      document.getElementsByName('members-age')[index].value = member.age;
      document.getElementsByName('members-key')[index].value = key;
      document.getElementsByName('members-update')[index].index = index;
      document.getElementsByName('members-delete')[index].index = index;
      index++;
    }
  });
};

const membersDelete = function (index) {
  const key = document.getElementsByName('members-key')[index].value;
  axios.delete('https://be-gooroom-default-rtdb.firebaseio.com/members/' + key + '.json').then(function (response) {
    console.log('Done membersDelete', response.data);
    membersRead();
  });
};

const membersUpdate = function (index) {
  const memberUpdate = {}
  memberUpdate[document.getElementsByName('members-key')[index].value] = {
    name: document.getElementsByName('members-name')[index].innerHTML,
    age: document.getElementsByName('members-age')[index].value
  };
  axios.patch('https://be-gooroom-default-rtdb.firebaseio.com/members.json', memberUpdate).then(function (response) {
    console.log('Done membersUpdate', response.data);
    membersRead();
  });
};
membersRead();