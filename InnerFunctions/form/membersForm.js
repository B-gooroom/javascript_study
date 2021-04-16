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
      const evalReturn = JSON.parse(nameTextObject.value);
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
    for (let index in members) {
      let innerHTML = tagPre.innerHTML + members[index];
      innerHTML += '\n';
      tagPre.innerHTML = innerHTML;
    }
    return members;
  };
  const membersDelete = function(index) {
    members.splice(index, 1);
    membersSet()
    return members;
  };
  const membersUpdate = function(index, member) {
    members[index] = member;
    membersSet()
    return members;
  };
  
  membersRead();