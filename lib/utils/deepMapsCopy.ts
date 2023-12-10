


export const deepMapsCopy = (sourceMap: any) => {
 return new Map(JSON.parse(JSON.stringify(Array.from(sourceMap))));
}
