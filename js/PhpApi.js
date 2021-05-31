/**
 * Manejador general de las peticiónes hacia el mini API
 */
class PhpApi{
    
    /**
     * Obtiene la url general del mini API
     */
    get url(){
        return 'http://localhost/SuplosTest_old2/BackEnd/index.php/PropertiesController/';
    }

    /**
     * Guarda un registro a través de mini API
     * @param {int} id 
     */
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

    /**
     * Elimina un registro a través de mini API
     * @param {int} id 
     * @returns 
     */
    delete(id){
        return this.consume('delete','id='+id, function(data){
            alert(data.data.message);
            $("[href='#tabs-2']").click();
        });
    }

    /**
     * Obtiene los datos guardados previamente en la bd y ejecuta un callback
     * @param {function} callback 
     * @returns 
     */
    read(callback){
        return this.consume('read','', callback);
    }

    /**
     * Realiza la petición hacia el mini API
     * @param {string} method 
     * @param {string} params 
     * @param {function} callback 
     */
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