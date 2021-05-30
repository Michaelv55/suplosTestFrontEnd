class GeneralData {

    constructor() {

    }

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

    getById(id){
        if (typeof id === 'number') {
            return this.data.find(function (value, index) {
                return value.Id === id;
            });
        }
        return {};
    }

}