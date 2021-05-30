class GeneralData {

    /**
     * Siempre se obtienen los datos siempre a través de una peticó síncrona 
     *  para mantener la información actualizada y evitar una poisble modificaicón de los datos
     *  desde la consola del navegador.
     */
    get data() {
        var allData = undefined;
        $.ajax({
            dataType: "json",
            url: './data-1.json',
            async : false,
            success: function (data, textStatus, jqXHR) {
                allData = data;
            }
        });
        return allData;
    }

    get cities(){
        return this.getUnique('Ciudad');
    }

    get types(){
        return this.getUnique('Tipo');
    }

    getUnique(index){
        const uniqueValues = [];
        this.data.forEach( (element) => {
            if (!uniqueValues.includes(element[index])) {
                uniqueValues.push(element[index]);
            }
        });
        return uniqueValues;
    }

    getById(id){
        if (typeof id === 'number') {
            return this.data.find(function (value, index) {
                return value.Id === id;
            });
        }
        return {};
    }

}