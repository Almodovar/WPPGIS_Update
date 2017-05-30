function hasElement(array, ele){
	array.forEach(function(element){
		if (element == ele){
			return true;
		}
	});
	return false;
}