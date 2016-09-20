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
			$("#tab-projects").append(projects);
			$("#tab-details").append(details);
		});
	}

	function makeTabProject(title) {
		return "<li><a data-toggle=\"pill\" href=\"#"+title+"\">"+title+"</a></li>"
	}

	function makeDetailTable(val) {

		var trs = [];
		$.each( val.builds, function( key, detail ) {
			trs.push(	"<tr>                            " +
						"	<td>"+detail.ipaName+"</td> " +
						"	<td>"+detail.link+"</td>     " +
						"	<td>"+detail.version+"</td>  " +
						"	<td><a>"+'detail.version'+"</a></td>  " +
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