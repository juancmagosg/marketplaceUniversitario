
/********************
USO DE LA LLAMADA GET
*********************/
$(document).ready(function(){
    $.getJSON("directorio.json", function(datos){
        //Se genera una tabla con los datos que se obtienen del archivo .json
        var directorio_datos = '';
        $.each(datos, function (respuesta, estado){
            directorio_datos += '<tr>';
            directorio_datos += '<td>'+estado.name+'</td>';
            directorio_datos += '<td>'+estado.house+'</td>';
            directorio_datos += '<td>'+estado.gender+'</td>';            
            directorio_datos += '<td>'+(2021-estado.yearOfBirth)+'</td>';
            directorio_datos += '<td><img src="'+estado.image+'" width="180" height="250"></td>';            
            directorio_datos += '</tr>';
        });
        $('#directorio_tabla').append(directorio_datos);
    });
});
/**********************************************************************************/