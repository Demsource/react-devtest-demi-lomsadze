export default function cutOverlayViewItems(items, selection) {
  const firstSelectionProperty = Object.keys(selection)[0];
  const firstSelectionValue = selection[firstSelectionProperty];

  let activeIndex;
  const activeItem = items.find((item, i) => {
    activeIndex = i;
    return item.id === firstSelectionValue;
  });

  let cutItems = [];

  if (items[activeIndex - 1]) {
    cutItems.push(items[activeIndex - 1], activeItem);
  } else {
    cutItems.push(activeItem, items[activeIndex + 1]);
  }

  return cutItems;
}
