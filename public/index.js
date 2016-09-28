	$(function() {
		loadTabsProjects();
	});

	function loadTabsProjects() {
		$.getJSON("http://localhost:3000/api/projects", function( data ) {
		
			var projects = [];
			var details = [];
			$.each( data, function( key, val ) {
				projects.push(makeTabProject(val.project));
				details.push(makeDetailTable(val));
			});
		
			$("#tab-projects").empty();
			$.each(projects, function(i,val) {
				$("#tab-projects").append(val);
			});
			$.each(details, function(i,val) {
				$("#tab-details").append(val);
			});
		});
	}

	function makeTabProject(title) {
		return "<li><a data-toggle=\"pill\" href=\"#"+title+"\">"+title+"</a></li>"
	}

	function makeDetailTable(val) {

		var trs = new String();
		$.each( val.builds, function( key, detail ) {
			trs  = trs.concat(	"<tr>                            " +
						"	<td>"+detail.ipaName+"</td> " +
						"	<td>"+detail.link+"</td>     " +
						"	<td>"+detail.version+"</td>  " +
						"	<td> <a> <img src=\"ios.png\" </img> </a> </td>  " +
						"</tr> ");
		});

		return 	"<div id=\""+val.project+"\" class=\"tab-pane fade\"> " +
				"	<table class=\"table table-hover\">      " +
				"	    <tbody>                            " +
				trs + 
				"	    </tbody>                           " +
				"	</table>                               " +
				"</div>                                    ";
	}		