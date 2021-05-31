/**
 * Paginador
 */
class Pager{

    constructor(container, nextPage, previousPage, pagerInfo, save){
        this.container = $('#'+container);
        this.nextPageBtn = $('#'+nextPage);
        this.previousPagebtn = $('#'+previousPage);
        this.pagerInfo = $('#'+pagerInfo);
        this.startList = 0;
        this.endList = 5;
        this.save = save;
        this.setEvents();
        this.disabledPreviousPage();
    }

    /**
     * Establece los eventos necesarios para avanzar y retoceder la página
     */
    setEvents(){
        var that = this;
        this.nextPageBtn.on('click', function(){
            that.nextPage();
        });
        this.previousPagebtn.on('click', function(){
            that.previousPage();
        });
    }

    /**
     * Avánza a la siguiete página
     */
    nextPage(){
        let oldEnd = this.endList;
        this.startList = oldEnd;
        if((oldEnd+5)>this.data.length){
            this.endList = this.data.length;
            this.disabledNextpage();
        }else{
            this.endList = oldEnd+5;
        }
        this.enabledPreviousPage();
        this.constructPager(this.data, false);
    }

    /**
     * Deshabilita el botó para avanzar a la siguiente página
     */
    disabledNextpage(){
        this.nextPageBtn.css('pointer-events', 'none');
        this.nextPageBtn.css('cursor', 'default');
    }

    /**
     * Habilita el botó para avanzar a la siguiente página
     */
    enabledNextpage(){
        this.nextPageBtn.css('pointer-events', '');
        this.nextPageBtn.css('cursor', 'pointer');
    }

    /**
     * Retrocede a la página anterior
     */
    previousPage(){
        let oldStart = this.startList;
        let oldEnd = this.endList;

        if(oldEnd == this.data.length){
            this.startList = oldStart-5;
            this.endList = oldStart;
            this.enabledNextpage();
        }else{
            this.startList = oldStart-5;
            this.endList = oldEnd-5;            
        }
        if(this.startList==0){
            this.disabledPreviousPage();
        }
        this.constructPager(this.data, false);
    }

    /**
     * Deshabilita el botón para retreceder la página
     */
    disabledPreviousPage(){
        this.previousPagebtn.css('pointer-events', 'none');
        this.previousPagebtn.css('cursor', 'default');
    }

    /**
     * Habilita el botón para retoceder la página
     */
    enabledPreviousPage(){
        this.previousPagebtn.css('pointer-events', '');
        this.previousPagebtn.css('cursor', 'pointer');
    }

    /**
     * Construye la lógica del paginador con los datos
     * @param {array[object]} properties 
     * @param {boolean} newSearch 
     */
    constructPager(properties, newSearch){
        this.clearContainer();
        this.data = properties;
        if(newSearch){
            this.startList=0;
            this.endList=5;
            this.disabledPreviousPage();
            if(this.data.length <= this.endList){
                this.endList=this.data.length;
                this.disabledNextpage();
            }else{
                this.enabledNextpage();
            }
        }
        for (let i = this.startList; i < this.endList; i++) {
            this.container.append(this.data[i].constructHtml(this.save));
        }
        this.setTextPagerInfo();
    }

    /**
     * Limpia el contenedor de la información del paginador
     * @returns {Pager}
     */
    clearContainer(){
        this.container.html('');
        return this;
    }

    /**
     * Establece el texto de los registros actualmente en pantalla
     */
    setTextPagerInfo(){
        this.pagerInfo.html(this.endList+' de '+this.data.length);
    }

}