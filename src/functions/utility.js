export const toDate = (seconds) =>{
    let date =  new Date(seconds * 1000).toString().split('(')[0];
    date = `${date.substring(4,24)}`;
    return date;
}