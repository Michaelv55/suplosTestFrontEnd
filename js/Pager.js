class Pager{

    constructor(){
        this.container = $('#propertyList');
        this.nextPageBtn = $('#nextPage');
        this.previousPagebtn = $('#previousPage');
        this.pagerInfo = $('#pagerInfo');
        this.startList = 0;
        this.endList = 5;
        this.setEvents();
        this.previousPagebtn.hide()
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
            this.nextPageBtn.hide();
        }else{
            this.endList = oldEnd+5;
            this.previousPagebtn.show();
        }
        this.constructPager(this.data);
    }

    previousPage(){
        let oldStart = this.startList;
        let oldEnd = this.endList;

        if(oldEnd == this.data.length){
            this.startList = oldStart-5;
            this.endList = oldStart;
            this.nextPageBtn.show();
        }else{
            this.startList = oldStart-5;
            this.endList = oldEnd-5;            
        }

        if(oldStart == 5){
            this.previousPagebtn.hide();
        }else{
            this.previousPagebtn.show();
        }
        this.constructPager(this.data);
    }

    constructPager(properties){
        this.clearContainer();
        this.data = properties;
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