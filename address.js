var Address=function(options){
	var me=this;
	me.options=options;
	me.target=$(me.options.target);
	me.areaData=me.options.data;
	me.init();
}

Address.prototype={ 
	init:function(){ 
		var me=this;
		me.createTemplate().event();
	},
	createTemplate:function(){
		var me=this;
		var tmp='<script type="text/html" id="areaSelect"> '+
		'<input type="text" class="select-ipt">'+
		'<input type="hidden" class="select-id">'+
		'<div class="area-show">'+
			'<ul class="area-list area-first-list">'+
				'{{each areaItem as value key}}'+
					'<li class="area-item first-item" data-id="{{value.id}}" data-index={{key}} data-level="{{value.level}}">{{value.name}}</li>'+
				'{{/each}}'+
			'</ul>'+
		'{{include "areaSecondSelect"}}'+
		'</div>'+
		'</script>'+
		'<script type="text/html" id="areaSecondSelect">'+
			'<ul class="area-list area-secend-list">'+
				'{{each areaChildItem as value key}}'+
					'<li class="area-item" data-id="{{value.id}}" data-level="{{value.level}}">{{value.name}}</li> '+
				'{{/each}}'+
			'</ul>'+
		'</script>';
		$('body').append(tmp);
		me.target.html(template('areaSelect', { areaItem: me.areaData,areaChildItem : me.areaData[0].children}));
		me.target.children('.area-show').hide();
		return me;
	},
	event:function(){
		var me=this;
		me.target.on('hover mouseover', '.area-first-list li', function(event) { 
			var $this=$(this),idx=$this.index();  	 
			$this.addClass('active').siblings().removeClass('active'); 
			$this.closest('.area-first-list').siblings('.area-secend-list').html(template('areaSecondSelect', {areaChildItem : me.areaData[idx].children}));
		}); 
		me.target.on('click', '.area-list li', function(event) { 
			var $this=$(this);
			$this.closest('.area-show').siblings('.select-ipt').val($this.text()).end().closest('.area-show').hide();
			$this.closest('.area-show').siblings('.select-id').val($this.attr('data-id')).end().closest('.area-show').hide();
		});
		me.target.on('focus','.select-ipt', function(event) {
			var $this=$(this);
			var idx=$this.siblings('.select-id').val()||0; 
			$this.siblings('.area-show').show().css('z-index');
		});
		$(document).on('click', function(event) {     
			if($(event.target).closest(me.target).length<=0){
				me.target.children('.area-show').hide();
			}
		});
		return this;
	}
}