$(document).ready(function() {
	$("#menu li").hide();
	
	$("#btn_menu").click(function() {
		$("#menu li").slideToggle("slow").siblings("p:visible");
	});
});