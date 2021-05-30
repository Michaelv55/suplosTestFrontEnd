class Pager{

    constructor(){
        this.container = $('#propertyList');
        this.nextPageBtn = $('#nextPage');
        this.previousPagebtn = $('#previousPage');
        this.pagerInfo = $('#pagerInfo');
        this.startList = 0;
        this.endList = 5;
        this.setEvents();
        this.disabledPreviousPage();
    }

    setEvents(){
        var that = this;
        this.nextPageBtn.on('click', function(){
            that.nextPage();
        });
        this.previousPagebtn.on('click', function(){
            that.previousPage();
        });
    }

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

    disabledNextpage(){
        this.nextPageBtn.css('pointer-events', 'none');
        this.nextPageBtn.css('cursor', 'default');
    }

    enabledNextpage(){
        this.nextPageBtn.css('pointer-events', '');
        this.nextPageBtn.css('cursor', 'pointer');
    }

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

    disabledPreviousPage(){
        this.previousPagebtn.css('pointer-events', 'none');
        this.previousPagebtn.css('cursor', 'default');
    }

    enabledPreviousPage(){
        this.previousPagebtn.css('pointer-events', '');
        this.previousPagebtn.css('cursor', 'pointer');
    }

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
            this.container.append(this.data[i].constructHtml());
        }
        this.setTextPagerInfo();
    }

    clearContainer(){
        this.container.html('');
        return this;
    }

    setTextPagerInfo(){
        this.pagerInfo.html(this.endList+' de '+this.data.length);
    }

}