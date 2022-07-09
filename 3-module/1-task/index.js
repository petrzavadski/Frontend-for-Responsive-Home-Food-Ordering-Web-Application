function namify(users) {
  // ваш код...
  let names = [];

  for (users['name'] of users) {
    names.push(users['name'].name);
  }

  return names;

}
