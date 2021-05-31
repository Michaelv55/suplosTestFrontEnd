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

    get priceInt(){
        return this.price.replace(/\D/g, '');
    }

    get imageHtml(){
        return '<img src="./img/home.jpg" alt="home image" class="responsive-img no-select"/>';
    }

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

    get button(){
        let button = '<button class="btn waves-effect waves-light" type="submit" name="action">Guardar';
        button += '<i class="material-icons right">cloud</i></button>';
        return button;
    }

    constructHtml(){
        var html = '<div class="property" id="property'+this.id+'">';
        html += this.imageHtml;
        html += '<div class="textContainer">'+this.listHtml+'<div/>';
        html += '</div>';
        html += '<div class="buttonContainer">'+this.button+'<div/>';
        return html;
    }
}