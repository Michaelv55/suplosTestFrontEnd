/**
 * Buscador
 */
class Seeker{

    constructor(city, type){
        this.cities = $('#'+city);
        this.types = $('#'+type);
        this.priceRange = $('#rangoPrecio');
    }

    /**
     * Obtiene lo filtros establecidos por el usuario
     */
    get filters(){
        let prices = this.priceRange.val().split(';');
        return {
            city: this.cities.val(),
            type: this.types.val(),
            minPrice: parseInt(prices[0]),
            maxPrice: parseInt(prices[1])
        };
    }

    /**
     * Busca los datos según los filtros del usuario
     * @param {boolean} toExcel 
     * @returns {array[Propertie]}
     */
    searchData(toExcel){
        const filters = this.filters;
        const dataReturn = [];
        generalData.data.forEach(element => {
            var property = new Propertie(
                element.Id,
                element.Direccion,
                element.Ciudad,
                element.Telefono,
                element.Codigo_Postal,
                element.Tipo,
                element.Precio
            );
            if(property.priceInt >= filters.minPrice  && property.priceInt <= filters.maxPrice || toExcel){
                let cityCond = (filters.city == property.city || filters.city == '');
                let typeCond = (filters.type == property.type || filters.type == '');
                if(cityCond && typeCond){ 
                    dataReturn.push(property); 
                }
            }
        });
        return dataReturn;
    }
}