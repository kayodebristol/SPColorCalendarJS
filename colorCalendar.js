function WaitForCalendarToLoad() {  
	LoadSodByKey("SP.UI.ApplicationPages.Calendar.js", function(){window.setTimeout(Start, 50);});
}
function Start(){
	ColorCalendar(); 
	var _onItemsSucceed = SP.UI.ApplicationPages.CalendarStateHandler.prototype.onItemsSucceed; 
	SP.UI.ApplicationPages.CalendarStateHandler.prototype.onItemsSucceed = function($p0, $p1){
		_onItemsSucceed.call(this, $p0, $p1); 

		ColorCalendar();
	}
}
function ColorCalendar(){
        if(jQuery('a:contains(' + SEPARATOR + ')') != null)
        {             
			jQuery('a:contains(' + SEPARATOR + ')').each(function (i) {
				$box = jQuery(this).parents('div[title]');
				var bgColor = GetBGColor(this.innerHTML);
				var fontColor = GetFontColor(this.innerHTML);
				var link = GetLink(this.innerHTML);
				this.innerHTML = GetActualText(this.innerHTML);
				if (link != '') {
					$box.find('a').attr('onclick','');
					$box.find('a').attr('href',link);
					}
				jQuery($box).attr("title", GetActualText(jQuery($box).attr("title")));
				$box.css('background-color', bgColor);
				$box.find('div,a').css('cssText','color: ' + fontColor + ' !important');
				$box.css('display', 'block');
				
				
			});      
		}  
}   
function GetActualText(originalText) {     
	var parts = originalText.split(SEPARATOR);
	return parts[0] ;   
}
function GetBGColor(originalText) {
	var parts = originalText.split(SEPARATOR);
	return parts[2];   
}
function GetFontColor(originalText){
	var parts = originalText.split(SEPARATOR);
	return parts[3];   
}
function GetLink(linkText) {     
	var parts = linkText.split(SEPARATOR);
	return parts[4];   
}
var SEPARATOR = "|||"; 	
jQuery('.ms-acal-item').css('display', 'none');
_spBodyOnLoadFunctionNames.push('WaitForCalendarToLoad');