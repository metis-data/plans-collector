


export const deepMapsCopy = (sourceMap: any) => {
  new Map(JSON.parse(JSON.stringify(Array.from(sourceMap))));
}
