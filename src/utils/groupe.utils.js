export const getGroupeId = (groupes, titleValue) => {
  for (let i = 0; i < groupes.length; i++) {
    if (groupes[i].title === titleValue) return groupes[i]._id;
  }
};

export const groupesOptions = (groupes, placeholder) => {
  const groupesTitles = [placeholder];
  for (let i = 0; i < groupes.length; i++) {
    groupesTitles.push(groupes[i].title);
  }
  return groupesTitles;
};
