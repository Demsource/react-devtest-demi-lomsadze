export default function haveGroup(newSelection, groupSelections) {
  const groupSelection = groupSelections[newSelection.id];
  let inAnyGroup = false;

  for (let group in groupSelection) {
    let inGroup = [];

    for (let attrKey in groupSelection[group]) {
      newSelection[attrKey] === groupSelection[group][attrKey]
        ? inGroup.push(true)
        : inGroup.push(false);
    }

    if (inGroup.every((res) => res === true)) {
      inAnyGroup = true;
      break;
    }
  }

  return inAnyGroup;
}
