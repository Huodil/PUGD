export const splitfunction = (e) => {
    return e
        .split("(")[1]
        .split(")")[0]
        .replace(/^"(.*)"$/, "$1");
}
export const FullDate = (str) =>{
    let d = new Date(str);
    const dateComponent = d.getUTCDate() + "-" + (d.getUTCMonth()+1) +"-"+ d.getUTCFullYear();
    /*let dateString =
        d.getUTCDate() + "-" +
        (d.getUTCMonth()+1) +"-"+
        d.getUTCFullYear() +" "+
        d.getUTCHours() + ":" +
        d.getUTCMinutes() + ":" +
        d.getUTCSeconds();
    console.log("dateString :",dateString)*/
    return dateComponent
}

export const  AddDays = (date, days) =>{
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}