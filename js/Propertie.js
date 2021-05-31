/**
 * Representación del objeto de propiedad
 */
class Propertie{

    vars = {
        'address':'Dirección',
        'city':'Ciudad',
        'phone':'Teléfono',
        'postalCode':'Código postal',
        'type':'Tipo',
        'price':'Precio',
    };

    constructor(id, address, city, phone, postalCode, type, price){
        this.id = id;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.postalCode = postalCode;
        this.type = type;
        this.price = price;
    }

    /**
     * Recarga los datos según su id
     * @returns {Propertie}
     */
    refreshData(){
        let data = generalData.getById(this.id);
        this.id = data.Id;
        this.address = data.Direccion;
        this.city = data.Ciudad;
        this.phone = data.Telefono;
        this.postalCode = data.Codigo_Postal;
        this.type = data.Tipo;
        this.price = data.Precio;
        return this;
    }

    /**
     * Obtiene le valor de la propiedad en un número entero
     */
    get priceInt(){
        return this.price.replace(/\D/g, '');
    }

    /**
     * Obtiene la imágen de la propiedad
     */
    get imageHtml(){
        return '<img src="./img/home.jpg" alt="home image" class="responsive-img no-select"/>';
    }

    /**
     * obtiene el html del la lista de datos de la propiedad
     *  @returns {string}
     */
    get listHtml(){
        var keys = Object.keys(this.vars);

        var list = '<ul>';
        keys.forEach(element => {
            list += '<li>';
            list += '<label class="titleText">'+this.vars[element]+': </label>';
            list += '<p class="textInfo">'+this[element]+'</p>';
            list += '</li>';
        });
        list += '</ul>';
        return list;
    }

    /**
     * obtiene el html del botón de acción de cada propiedad
     * @param {boolean} save 
     * @returns 
     */
    getButton(save){
        let button = '<button class="btn waves-effect waves-light" ';
        var buttonSave = 'onclick="phpApi.save('+this.id+')">Guardar';
        var buttonDelete = 'onclick="phpApi.delete('+this.id+')">Eliminar';
        button += ((save)?buttonSave:buttonDelete);
        button += '<i class="material-icons right">cloud</i></button>';
        return button;
    }

    /**
     * Obtiene el html del conendio de la pripiedad
     * @param {boolean} save 
     * @returns {string}
     */
    constructHtml(save){
        var html = '<div class="property" id="property'+this.id+'">';
        html += this.imageHtml;
        html += '<div class="textContainer">'+this.listHtml+'<div/>';
        html += '</div>';
        html += '<div class="buttonContainer">'+this.getButton(save)+'<div/>';
        return html;
    }

    /**
     * Obtiene los datos de la propiedad como parámetros de URL
     * @returns string
     */
    toUrlParams(){
        var keys = Object.keys(this.vars);
        var urlParams = '';
        keys.forEach(element => {
            urlParams+=element+'='+this[element].replace('#', 'N')+'&';
        });
        return urlParams;
    }
}