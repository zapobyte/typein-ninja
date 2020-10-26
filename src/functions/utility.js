export const toDate = (seconds) =>{
    return new Date(seconds * 1000).toString().split('(')[0];
}