$(document).ready(function(){
	
	var sub = $('#sub') //声明变量 指向子菜单
	
	var activeRow;  //激活的一级菜单的行  用于后续样式修改
	var activeMenu; //对应的二级菜单
	var timer;  //延迟
	var mouseInSub = false;  //鼠标是否在子菜单中
	
	sub.on('mouseenter',function(e){
		mouseInSub = true;
	}).on('mouseleave',function(e){
		mouseInSub = false;
	})
	
	var mouseTrack = [] ; //跟踪记录鼠标的坐标   
	
	var moveHandler = function(e){
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})
		
		/*只保留三个位置信息
		 * 如果鼠标位置数组大于三  则弹出多余的位置信息 
		 * */
		if(mouseTrack.length>3){
			mouseTrack.shift(); 
		}
		
	}
	
	/* 为一级菜单绑定事件 */
	$('#test')
		.on('mouseenter',function(e){
			sub.removeClass('none') //鼠标移入时  显示对应的二级菜单
			
			$(document).bind('mousemove',moveHandler) ;   //mousemove一般绑定在document上
		})
		.on('mouseleave',function(e){
			sub.addClass('none')  //鼠标离开时 隐藏对应的二级菜单
			
			if(activeRow){
				activeRow.removeClass('active')   //鼠标离开时  移除选中的一级菜单的样式
				activeRow = null ;   //制空
			}
			
			if(activeMenu){
				activeMenu.addClass('none');
				activeMenu = null;
			}
			
			$(document).unbind('mousemove',moveHandler);  //解绑
			
		})
		/* 
		 * 为一级菜单中的每一个列表项绑定事件
		 * 使用动态代理的方式为列表绑定事件
		 * 优点:  便于增加和删除  性能好
		 * 
		 * */
		.on('mouseenter','li',function(e){
			if(!activeRow){
				activeRow = $(e.target).addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				return
			}
			
			//debounse 祛抖
			if(timer){
				clearTimeout(timer); //清除计时器
			}
			
			
			var currMousePos = mouseTrack[mouseTrack.length - 1]  ; //鼠标当前坐标
			var leftCorner = mouseTrack[mouseTrack.length - 2]  ;//鼠标上一次的坐标
			
			var delay = needDelay(sub, leftCorner, currMousePos) ;
			
			/* 当前坐标在三角形内,需要延迟 */
			if(delay){
				//设置一个延迟
				timer = setTimeout(function(){
					/* 在列表项中移动时,清楚上一次的状态 */
				
					if(mouseInSub){         //如果鼠标在子菜单中,不做后续处理,直接返回
						return
					}
					activeRow.removeClass('active');
					activeMenu.addClass('none');
					
					//指向当前的一级菜单
					activeRow = $(e.target);
					activeRow.addClass('active');
					activeMenu = $('#' + activeRow.data('id'));
					activeMenu.removeClass('none');
					timer = null;
					
					
				},300)
			}else{
				//不在三角形内,直接进行切换
				var prevActiveRow = activeRow ; //上一次的行
				var prevActiveMenu = activeMenu ;//上一次的二级菜单
				
				activeRow = $(e.target);
				activeMenu = $('#' + activeRow.data('id'));
				
				prevActiveRow.removeClass('active');
				prevActiveMenu.addClass('none');
				
				activeRow.addClass('active');
				activeMenu.removeClass('none');
				
			}
			
			
			
			
			
		})
		
})