export const getGroupeId = (groupes, titleValue) => {
  for (let i = 0; i < groupes.length; i++) {
    if (groupes[i]._id === titleValue) return titleValue;
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

export const getGroupeTitle = (groupes, groupeId) => {
  for (let i = 0; i < groupes.length; i++) {
    if (groupes[i]._id === groupeId) return groupes[i].title;
  }
};
