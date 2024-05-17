export const _id = [...Array(40)].map(
  (_, index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`
);

export const _mock = {
  id: (index) => _id[index],
};
