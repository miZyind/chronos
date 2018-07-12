

const queryById = (parent: any, getId: number) => {
  return parent.find((item: any) => {
    return item.id == getId;
  });
};
const operation = {
  queryById
}
export default operation;
