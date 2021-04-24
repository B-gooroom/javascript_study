// const url = new URL(window.location);
// const queryString = url.searchParams;
// const nameText = queryString.get('name-text');
// const nameHiddens = queryString.getAll('name-hidden');
// const nameHidden = nameHiddens[0];

// const nameTextObjects = document.getElementsByName('name-text');
// const nameTextObject = nameTextObjects[0];
// nameTextObject.value = nameText;
// focus = 검색엔진의 '깜빡이'기능
// nameTextObject.focus();
// nameTextObject.blur();

  // const members = [];
  const membersGet = sessionStorage.getItem('members');
  const membersLogical = membersGet || '[]';
  const members = JSON.parse(membersLogical);
  
  const membersSet = function() {
    const membersSet = JSON.stringify(members);
    sessionStorage.setItem('members', membersSet);
  }
// form태그를 그대로 가져옴으로써 membesSubmit의 함수는 불필요!
  // const membersSubmit = function(form) {
  //   const nameTextObject = form['name-text'];
  //   try {
  //     const evalReturn = eval(nameTextObject.value);
  //     console.log(evalReturn);
  //   } catch(error) {
  //     console.error(error);
  //     alert(error);
  //     return false;
  //   }
  // }

  // const membersCreate = function(member) {
  //   members.push(member);
  //   membersSet()
  //   return members;
  // };
  const membersCreate = function(form) {
    // const nameTextObject = form['name-text'];
    // members.push(nameTextObject.value);
    // nameTextObject.value = '';
    const memberNameObject = form['member-name'];
    const memberAgeObject = form['member-age'];
    members.push({
      name: memberNameObject.value,
      age: memberAgeObject.value
    });
    memberNameObject.value = '';
    memberAgeObject.value = '';
    membersSet();
    return membersRead();
  };

  // const membersRead = function() {
  //   // for (let index in members) {
  //   //   document.writeln(members[index]);
  //   // }
  //   const tagPre = document.getElementById('tag-pre');
  //   // for (let index in members) {
  //   //   // let innerHTML = tagPre.innerHTML + members[index];
  //   //   // innerHTML += '\n';
  //   //   // tagPre.innerHTML = innerHTML;
  //   //   tagPre.innerHTML += members[index] + '\n';
  //   // }
  //   tagPre.innerHTML = '';
  //   for (let index in members) {
  //     tagPre.innerHTML += '<input type="text" name="members-name" value="' + members[index] + '">';
  //     tagPre.innerHTML += '<button onclick="membersUpdate(' + index + ')">Update</button>';
  //     tagPre.innerHTML += '<button onclick="membersDelete(' + index + ')">Delete</button>';
  //     tagPre.innerHTML += '\n';
  //   }
  //   console.log('Readed', members);
  //   return members;
  // };
  const membersRead = function() {
    const tagDivParent = document.getElementById('tag-div-parent');
    const tagDivChild = document.getElementById('tag-div-child');
    tagDivParent.innerHTML = '';
    for (let index in members) {
      const newDivChild = tagDivChild.cloneNode(true);
      tagDivParent.appendChild(newDivChild);

      const membersNameObject = document.getElementsByName('members-name')[index];
      const membersAgeObject = document.getElementsByName('members-age')[index];
      const membersUpdateObject = document.getElementsByName('members-update')[index];
      const membersDeleteObject = document.getElementsByName('members-delete')[index];
      // membersNameObject.value = members[index];
      membersNameObject.value = members[index].name;
      membersAgeObject.value = members[index].age;
      membersUpdateObject.index = index;
      membersDeleteObject.index = index;
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
    const name = document.getElementsByName('members-name')[index].value;
    const age = document.getElementsByName('members-age')[index].value;
    members[index] = {
      name: name,
      age: age
    };
    membersSet();
    return membersRead();
  };
  
  membersRead();