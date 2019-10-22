let merge = (l, r) => {
  let l_index = 0;
  let r_index = 0;
  let result = [];
  while (l_index < l.length && r_index < r.length) {
    if (l[l_index] <= r[r_index]) {
      result.push(l[l_index]);
      l_index++;
    } else {
      result.push(r[r_index]);
      r_index++;
    }
  }

  result = result.concat(l.slice(l_index), r.slice(r_index));
  return result;
};
const mergesort = arr => {
  if (arr.length == 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);

  let l = arr.slice(0, mid);
  let r = arr.slice(mid);

  return merge(mergesort(l), mergesort(r));
};
// console.log(merge([1], [2]));
console.log(mergesort([1, 6, 3, 2, 7]));
