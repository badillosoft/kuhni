function Table() {
    const table = document.createElement('table');

    table.dataset.config = JSON.stringify({
        title : "My table caption",
        dataRows : ["content1","content2","content3"],
        header : "header",
        borderHeader: "2px solid cornflowerblue",
        borderData: "1px dashed cornflowerblue"
    });

    table.addEventListener("@update", () => {
        
        const config = JSON.parse(table.dataset.config);
        table.createCaption();
        table.innerHTML = config.title;

        function createHeader() {
            let newRowHeader = document.createElement('tr');
            let header = document.createElement('th');

            header.style.border = config.borderHeader;
            header.innerText = config.header;

            newRowHeader.appendChild(header);
            table.appendChild(newRowHeader)    
        }
        createHeader()

        config.dataRows.forEach(text => {
            let newRow = document.createElement('tr');
            let data = document.createElement('td');

            data.innerText = text;
            data.style.border = config.borderData;

            newRow.appendChild(data);
            table.appendChild(newRow);
        
        });
        

    });

    table.dispatchEvent( new CustomEvent("@update") );


    return table
}