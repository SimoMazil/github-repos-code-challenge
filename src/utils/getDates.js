export const datesDiffInDays = (repoDate) => {
  const dt = new Date(repoDate);
  return Math.floor((Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) ) /(1000 * 60 * 60 * 24));
}

export const dateBeforeOneMonth = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date.toISOString().split('T')[0];
}