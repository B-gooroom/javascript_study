const url = new URL(window.location);
const queryString = url.searchParams;
const nameText = queryString.get('name-text');
const nameHiddens = queryString.getAll('name-hidden');
const nameHidden = nameHiddens[0];

const nameTextObjects = document.getElementsByName('name-text');
const nameTextObject = nameTextObjects[0];
nameTextObject.value = nameText;
// focus = 검색엔진의 '깜빡이'기능
nameTextObject.focus();
nameTextObject.blur();

  // const members = [];
  const membersGet = sessionStorage.getItem('members');
  const membersLogical = membersGet || '[]';
  const members = JSON.parse(membersLogical);
  
  const membersSet = function() {
    const membersSet = JSON.stringify(members);
    sessionStorage.setItem('members', membersSet);
  }

  const membersSubmit = function(form) {
    const nameTextObject = form['name-text'];
    try {
      const evalReturn = eval(nameTextObject.value);
      console.log(evalReturn);
    } catch(error) {
      console.error(error);
      alert(error);
      return false;
    }
  }

  const membersCreate = function(member) {
    members.push(member);
    membersSet()
    return members;
  };
  const membersRead = function() {
    // for (let index in members) {
    //   document.writeln(members[index]);
    // }
    const tagPre = document.getElementById('tag-pre');
    // for (let index in members) {
    //   // let innerHTML = tagPre.innerHTML + members[index];
    //   // innerHTML += '\n';
    //   // tagPre.innerHTML = innerHTML;
    //   tagPre.innerHTML += members[index] + '\n';
    // }
    tagPre.innerHTML = '';
    for (let index in members) {
      tagPre.innerHTML += '<input type="text" name="members-name" value="' + members[index] + '">';
      tagPre.innerHTML += '<button onclick="membersUpdate(' + index + ')">Update</button>';
      tagPre.innerHTML += '<button onclick="membersDelete(' + index + ')">Delete</button>';
      tagPre.innerHTML += '\n';
    }
    console.log('Readed', members);
    return members;
  };
  const membersDelete = function(index) {
    members.splice(index, 1);
    membersSet()
    return membersRead();
  };
  // const membersUpdate = function(index, member) {
  //   members[index] = member;
  //   membersSet()
  //   return members;
  // };
  const membersUpdate = function(index) {
    const name = document.getElementsByName('members-name')[0].value
    members[index] = name;
    membersSet();
    return membersRead();
  };
  
  membersRead();