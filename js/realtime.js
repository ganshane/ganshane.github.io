!function($)
{
  function StockList(container,list)
  {
    this.list = list;
    this.last = [];
    this.getData();
    setInterval(this.getData.fnBind(this),this.interval);
  }
  merge(StockList.prototype,
    {
      getData: function()
      {
        loadHQ(this.list.join(',').replace(/\./g,'$'),this.gotData.fnBind(this));
      },
      flicker: function(el,color)
      {
        var _flag = 6;
        var _timer = setInterval(function()
        {
          el.css('color',_flag % 2 == 0 ? 'silver' : color);
          _flag--;
          if(_flag == 0)
          {
            clearInterval(_timer);
          }
        },200);
      },
      gotData: function()
      {
        for(var i = 0;i < this.list.length;i++)
        {
          _data = hqParser.us(window['hq_str_' + this.list[i].replace('.','$')],this.list[i].replace('gb_',''));
          _children = $("#"+_data.sym).children();
          if(_children){
            _color = 'green';
            if(_data.changeP >0)
              _children.eq(2).html(_data.changeP).css({'color':'green'});
            else{
              _children.eq(2).html(_data.changeP).css({'color':'red'});
              _color = 'red';
            }

            _children.eq(1).html(_data.now);
            if(this.last[i] != _data.now){
              this.flicker(_children.eq(2),_color);
            }
            this.last[i] = _data.now;
          }else{
            console.debug(_data.sym+" not found");
          }
        }
      },
      interval: 5 * 1000
 });
  if (typeof stockList !="undefined")
    new StockList('stockList',stockList);
}(jQuery);
