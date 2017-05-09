/* 向量计算函数 */


/* 判断向量的符号 */
function sameSign(a, b){
	return (a ^ b) >= 0
}


/* 向量的定义就是终点坐标减去起点坐标 */
function vector(a,b){
	return {
		x: b.x - a.x,
		y: b.y - a.y
	}
}

/* 向量的叉乘公式 
    向量1的x坐标 * 向量2的y坐标  - 向量2的x坐标 * 向量1的y坐标
 * */
function vectorProduct(v1, v2){
	return v1.x * v2.y - v2.x * v1.y
}

/* 叉乘的判断方法  */
function isPointInTrangle(p,a,b,c){
	var pa = vector(p,a);
	var pb = vector(p,b);
	var pc = vector(p,c);
	
	var t1 = vectorProduct(pa,pb);
	var t2 = vectorProduct(pb,pc);
	var t3 = vectorProduct(pc,pa);
	
	return sameSign(t1, t2) && sameSign(t2, t3)
}

/* 判断是否需要延迟 */

function needDelay(elem, leftCorner, currMosuePos){
	var offset = elem.offset();
	
	
	var topLeft = {
		x: offset.left,
		y: offset.top
		
	}
	
	var bottomLeft = {
		x: offset.left,
		y: offset.top + elem.height()
		
	}
	
	return isPointInTrangle(currMosuePos, leftCorner, topLeft, bottomLeft);
}
