const QUOTATIONS_PER_PAGE = 3;

export default (qts: Array<Object>) => {
  const quotations = [];
  if (qts.length === 0) quotations.push([]);
  else
    for (let i = 0; i < qts.length; i += QUOTATIONS_PER_PAGE)
      quotations.push(qts.slice(i, i + QUOTATIONS_PER_PAGE));
  return quotations;
};
