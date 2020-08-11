function export2csv(arrayOfObjects) {

    let data = "";
    const tableData = [];
    const rows = [];

    const headers = []
    if (arrayOfObjects.length > 0) {
        Object.keys(arrayOfObjects[0]).forEach(header => {
            headers.push(header)
        });
    }
    console.log(headers);
    
    rows.push(headers)
    arrayOfObjects.forEach(element => {
        const values = []
        headers.forEach(objectProperty => {
            values.push(element[objectProperty])
        });
        rows.push(values)
    });
    console.log(rows);
    for (const row of rows) {
      const rowData = [];
      for (const column of row) {
        rowData.push(column);
      }
      tableData.push(rowData.join(","));
    }
    data += tableData.join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    a.setAttribute("download", "data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export default export2csv
