class Propertie{

    constructor(idProperty){
        this.id = idProperty;
    }

    get data(){
        return generalData.getById(this.id);
    }

    get imageHtml(){
        return '<img src="./img/home.jpg" alt="home image" />';
    }

    get listHtml(){
        var data = this.data;
        var keys = Object.keys(data);

        var list = '<ul>';
        keys.forEach(element => {
            list += '<li>';
            list += '<label class="titleText">'+element+': <label/>';
            list += '<p class="textInfo">'+data[element]+'<p/>';
            list += '<li/>';
        });
        list += '<ul/>';
        return list;
    }

    constructHtml(){
        var html = '<div class="property" id="property'+this.id+'">';
        html += this.imageHtml;
        html += '<div class="textContainer">'+this.listHtml+'<div/>';
        html += '</div>';
    }
}