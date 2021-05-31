class PhpApi{
    
    get url(){
        return 'http://localhost/SuplosTest_old2/BackEnd/index.php/PropertiesController/';
    }

    save(id){
        var data = generalData.getById(id);
        var property = new Propertie(
            data.Id,
            data.Direccion,
            data.Ciudad,
            data.Telefono,
            data.Codigo_Postal,
            data.Tipo,
            data.Precio
        );
        this.consume('create', property.toUrlParams(), function (data) {
            alert(data.data.message);
        });
    }

    delete(id){
        return this.consume('delete','id='+id, function(data){
            alert(data.data.message);
            $("[href='#tabs-2']").click();
        });
    }

    read(callback){
        return this.consume('read','', callback);
    }

    consume(method, params, callback){
        fetch(this.url+method+'?'+params)
        .then(function(response){
            if (response.status !== 200) {
                window.location.reload();
                return;
            }
            response.json().then(callback);
        })
        .then(data => console.log(data));
    }
}