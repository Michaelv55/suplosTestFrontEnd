class Propertie{

    constructor(id, address, city, phone, postalCode, type, price){
        this.id = id;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.postalCode = postalCode;
        this.type = type;
        this.price = price;
    }

    refreshData(){
        let data = generalData.getById(this.id);
        this.id = data.Id;
        this.address = data.Direccion;
        this.city = data.Ciudad;
        this.phone = data.Telefono;
        this.postalCode = data.Codigo_Postal;
        this.type = data.Tipo;
        this.price = data.Precio;
    }

    get priceInt(){
        return this.price.replace(/\D/g, '');
    }

    get imageHtml(){
        return '<img src="./img/home.jpg" alt="home image" />';
    }

    get listHtml(){
        var keys = Object.keys(this);

        var list = '<ul>';
        keys.forEach(element => {
            list += '<li>';
            list += '<label class="titleText">'+element+': </label>';
            list += '<p class="textInfo">'+this[element]+'</p>';
            list += '</li>';
        });
        list += '</ul>';
        return list;
    }

    constructHtml(){
        var html = '<div class="property" id="property'+this.id+'">';
        html += this.imageHtml;
        html += '<div class="textContainer">'+this.listHtml+'<div/>';
        html += '</div>';
        return html;
    }
}