class Seeker{

    constructor(){
        this.cities = $('#selectCiudad');
        this.types = $('#selectTipo');
        this.priceRange = $('#rangoPrecio');
    }

    get filters(){
        let prices = this.priceRange.val().split(';');
        return {
            city: this.cities.val(),
            type: this.types.val(),
            minPrice: parseInt(prices[0]),
            maxPrice: parseInt(prices[1])
        };
    }

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